<template>
  <app-modal :title="title" @close="goBack">
    <form class="form" @submit.prevent="submit" novalidate>
      <div class="form__field--full">
        <app-textbox
          field-id="mealName"
          label="Meal Name"
          v-model="mealName"
        ></app-textbox>
      </div>
    </form>
    <meal-ingredients
      v-if="mealIngredients.length"
      :ingredients="mealIngredients"
    ></meal-ingredients>
    <meal-ingredient-search @add="addIngredient"></meal-ingredient-search>
    <div class="form__buttons form__field--full">
      <app-button @click="submit">Confirm</app-button>
      <app-button v-if="mealId" color="red" @click="deleteMeal"
        >Delete</app-button
      >
    </div>
  </app-modal>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import apiCall from "../../mixins/api-call.js";

import MealIngredients from "./MealIngredients.vue";
import MealIngredientSearch from "./MealIngredientSearch.vue";

export default {
  components: {
    MealIngredients,
    MealIngredientSearch,
  },
  props: {
    mealId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const title = computed(() => {
      return props.mealId ? "Edit Meal" : "New Meal";
    });
    const form = "";
    const mealName = ref("");
    const store = useStore();
    const meal = computed(() => {
      if (props.mealId) {
        const mealList = store.getters["meals/getAll"];
        return mealList.find((item) => item._id === props.mealId);
      }
    });
    const allIngredients = computed(() => {
      return store.getters["ingredients/getAll"];
    });
    const mealIngredients = ref([]);
    const addIngredient = (ingredientId) => {
      const existingItem = mealIngredients.value.find((ingredient) => {
        return ingredient.id === ingredientId;
      });
      if (!existingItem) {
        const { name, unit } = allIngredients.value.find((ingredient) => {
          return ingredient._id === ingredientId;
        });
        const item = { id: ingredientId, name, unit, quantity: 0 };
        mealIngredients.value.push(item);
      }
    };
    const submit = async () => {
      try {
        const id = props.mealId;
        const response = await apiCall(
          id ? `meals/${id}` : "meals",
          id ? "PUT" : "POST",
          false,
          { meal: form }
        );
        if (response.ok) {
          store.dispatch("meals/fetchAll");
          goBack();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const deleteMeal = async () => {
      const response = await apiCall(`meals/${props.mealId}`, "DELETE");
      if (response.ok) {
        store.dispatch("meals/fetchAll");
        goBack();
      }
    };
    const router = useRouter();
    const goBack = () => {
      router.push({ name: "meals" });
    };
    onMounted(() => {
      if (meal.value) {
        const fields = Object.keys(form);
        for (let field of fields) {
          form[field] = meal.value[field];
        }
      } else if (props.mealId) {
        goBack();
      }
    });
    return {
      mealName,
      mealIngredients,
      addIngredient,
      title,
      submit,
      deleteMeal,
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.form {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  &__field {
    &--full {
      grid-column: 1 / -1;
    }
    &--large {
      grid-column: 1 / 4;
    }
    &--small {
      grid-column: 4 / -1;
    }
  }
  &__buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
}
</style>
