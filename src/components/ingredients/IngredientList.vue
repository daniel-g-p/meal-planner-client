<template>
  <div>
    <router-view></router-view>
    <app-title>Ingredients</app-title>
    <router-link :to="newIngredientLink">
      <app-button>New Ingredient</app-button>
    </router-link>
    <main class="ingredients">
      <p v-if="!ingredients.length">
        Add your first ingredient to get started.
      </p>
      <ul v-else class="ingredients__list">
        <ingredients-header></ingredients-header>
        <li v-for="ingredient in ingredients" :key="ingredient.id">
          <ingredients-item
            :id="ingredient._id"
            :name="ingredient.name"
            :unit="ingredient.unit"
            :carbohydrates="ingredient.carbohydrates"
            :fats="ingredient.fats"
            :protein="ingredient.protein"
            :sugars="ingredient.sugars"
            :saturatedFats="ingredient.saturatedFats"
          ></ingredients-item>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import IngredientsHeader from "./IngredientsHeader.vue";
import IngredientsItem from "./IngredientsItem.vue";

export default {
  components: {
    IngredientsHeader,
    IngredientsItem,
  },
  setup() {
    const store = useStore();
    const ingredients = computed(() => {
      return store.getters["ingredients/getAll"];
    });
    const newIngredientLink = { name: "newIngredient" };
    onMounted(() => {
      store.dispatch("ingredients/fetchAll");
    });
    return { ingredients, newIngredientLink };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.ingredients {
  margin-top: 1.5rem;
  &__list {
    font-size: 0.875rem;
  }
}
</style>
