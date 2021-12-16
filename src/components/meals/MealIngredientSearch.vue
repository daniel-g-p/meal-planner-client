<template>
  <div class="search">
    <form class="search__form" @submit.prevent="search">
      <div class="search__bar">
        <app-textbox
          class="search__textbox"
          fieldId="searchQuery"
          label="Search ingredients"
          v-model="searchQuery"
        ></app-textbox>
        <app-button class="search__button" color="grey">Search</app-button>
      </div>
    </form>
    <div v-if="searchResults.length" class="search__results">
      <app-button
        v-for="item in searchResults"
        :key="item.id"
        color="light"
        @click="addIngredient(item.id)"
      >
        {{ item.name }}
      </app-button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup(props, { emit }) {
    const store = useStore();
    const searchQuery = ref("");
    const ingredients = computed(() => {
      return store.getters["ingredients/getAll"];
    });
    const search = () => {
      const result = ingredients.value.filter((ingredient) => {
        return ingredient.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      });
      searchResults.value = result.map((item) => {
        return { id: item._id, name: item.name };
      });
    };
    const searchResults = ref([]);
    const addIngredient = (id) => {
      emit("add", id);
      reset();
    };
    const reset = () => {
      searchQuery.value = "";
      searchResults.value = [];
    };
    return { searchQuery, search, searchResults, addIngredient };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.search {
  padding: 1rem 0;
  margin: 1rem 0;
  border-top: 1px solid $grey-dark;
  border-bottom: 1px solid $grey-dark;
  &__bar {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  &__textbox {
    flex-grow: 1;
  }
  &__button {
    margin-top: 19px;
  }
  &__results {
    font-size: 0.75rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
}
</style>
