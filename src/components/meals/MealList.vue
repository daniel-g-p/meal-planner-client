<template>
  <div>
    <router-view></router-view>
    <app-title>Meals</app-title>
    <router-link :to="newMealLink">
      <app-button>New Meal</app-button>
    </router-link>
    <main class="meals">
      <p v-if="!meals.length">Add your first meal to get started.</p>
      <ul v-else class="meals__list">
        <app-table-header></app-table-header>
        <li v-for="meal in meals" :key="meal.id">
          <meals-item
            :id="meal.id"
            :name="meal.name"
            :carbohydrates="meal.nutrients.carbohydrates"
            :fats="meal.nutrients.fats"
            :protein="meal.nutrients.protein"
            :sugars="meal.nutrients.sugars"
            :saturatedFats="meal.nutrients.saturatedFats"
          ></meals-item>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import MealsItem from "./MealsItem.vue";

export default {
  components: {
    MealsItem,
  },
  setup() {
    const store = useStore();
    const meals = computed(() => {
      const mealList = store.getters["meals/getAll"];
      const ingredientList = store.getters["ingredients/getAll"];
      return mealList.map((meal) => {
        const nutrients = {
          carbohydrates: 0,
          sugars: 0,
          fats: 0,
          saturatedFats: 0,
          protein: 0,
        };
        for (let ingredient of meal.ingredients) {
          const { quantity, id } = ingredient;
          const { unit, carbohydrates, sugars, fats, saturatedFats, protein } =
            ingredientList.find((item) => {
              return item._id === id;
            });
          if (unit === "100g" || unit === "100ml") {
            nutrients.carbohydrates += Math.round(
              (quantity * carbohydrates) / 100
            );
            nutrients.sugars += Math.round((quantity * sugars) / 100);
            nutrients.fats += Math.round((quantity * fats) / 100);
            nutrients.saturatedFats += Math.round(
              (quantity * saturatedFats) / 100
            );
            nutrients.protein += Math.round((quantity * protein) / 100);
          } else {
            nutrients.carbohydrates += Math.round(quantity * carbohydrates);
            nutrients.sugars += Math.round(quantity * sugars);
            nutrients.fats += Math.round(quantity * fats);
            nutrients.saturatedFats += Math.round(quantity * saturatedFats);
            nutrients.protein += Math.round(quantity * protein);
          }
        }
        return {
          id: meal._id,
          name: meal.name,
          ingredients: meal.ingredients,
          nutrients,
        };
      });
    });
    const newMealLink = { name: "newMeal" };
    onMounted(() => {
      store.dispatch("ingredients/fetchAll");
      store.dispatch("meals/fetchAll");
    });
    return { meals, newMealLink };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.meals {
  margin-top: 1.5rem;
  &__list {
    font-size: 0.875rem;
  }
}
</style>
