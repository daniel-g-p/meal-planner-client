<template>
  <app-modal :title="title" @close="goBack">
    <form class="form" @submit.prevent="submit" novalidate>
      <div class="form__field--full">
        <app-textbox
          field-id="mealName"
          label="Meal Name"
          v-model="form.name"
        ></app-textbox>
      </div>
    </form>
    <meal-ingredients
      v-if="form.ingredients.length"
      :ingredients="form.ingredients"
      @set-quantity="setQuantity"
      @remove="removeItem"
    ></meal-ingredients>
    <meal-ingredient-search @add="addItem"></meal-ingredient-search>
    <div class="form__buttons form__field--full">
      <app-button @click="submit">Confirm</app-button>
      <app-button v-if="mealId" color="red" @click="deleteMeal"
        >Delete</app-button
      >
    </div>
  </app-modal>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
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
    const title = computed(() => (props.mealId ? "Edit Meal" : "New Meal"));
    const store = useStore();
    const allIngredients = computed(() => store.getters["ingredients/getAll"]);
    const meal = computed(() => {
      if (props.mealId) {
        const mealList = store.getters["meals/getAll"];
        return mealList.find((item) => item._id === props.mealId);
      }
    });
    const form = reactive({
      name: "",
      ingredients: [],
    });
    const findIngredientIndex = (array, idProperty, ingredientId) => {
      return array.findIndex((item) => item[idProperty] === ingredientId);
    };
    const findIngredient = (array, idProperty, ingredientId) => {
      return array.find((item) => item[idProperty] === ingredientId);
    };
    const addItem = (ingredientId) => {
      const existingItem = findIngredient(form.ingredients, "id", ingredientId);
      if (!existingItem) {
        const { name, unit } = findIngredient(
          allIngredients.value,
          "_id",
          ingredientId
        );
        form.ingredients.push({ id: ingredientId, name, unit, quantity: 0 });
      }
    };
    const setQuantity = (ingredientId, quantity) => {
      const index = findIngredientIndex(form.ingredients, "id", ingredientId);
      form.ingredients[index].quantity = +quantity;
    };
    const removeItem = (ingredientId) => {
      const index = findIngredientIndex(form.ingredients, "id", ingredientId);
      form.ingredients.splice(index, 1);
    };
    const submit = async () => {
      try {
        const id = props.mealId;
        const response = await apiCall(
          id ? `meals/${id}` : "meals",
          id ? "PUT" : "POST",
          false,
          {
            meal: {
              name: form.name,
              ingredients: form.ingredients
                .filter((ingredient) => ingredient.quantity)
                .map((ingredient) => {
                  return { id: ingredient.id, quantity: ingredient.quantity };
                }),
            },
          }
        );
        if (response.ok) {
          goBack();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const deleteMeal = async () => {
      const response = await apiCall(`meals/${props.mealId}`, "DELETE");
      if (response.ok) {
        goBack();
      }
    };
    const router = useRouter();
    const goBack = () => {
      store.dispatch("ingredients/fetchAll");
      store.dispatch("meals/fetchAll");
      router.push({ name: "meals" });
    };
    const init = () => {
      if (meal.value) {
        form.name = meal.value.name;
        form.ingredients = meal.value.ingredients;
      }
    };
    onMounted(() => init());
    return {
      title,
      form,
      addItem,
      setQuantity,
      removeItem,
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
