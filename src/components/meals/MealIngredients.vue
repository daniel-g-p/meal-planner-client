<template>
  <div class="list">
    <h3 class="list__title">Meal ingredients</h3>
    <meal-ingredients-item
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :id="ingredient.id"
      :name="ingredient.name"
      :unit="ingredient.unit"
      :quantity="ingredient.quantity"
      @set-quantity="setQuantity"
      @remove="removeItem"
    >
    </meal-ingredients-item>
  </div>
</template>

<script>
import MealIngredientsItem from "./MealIngredientsItem.vue";

export default {
  components: {
    MealIngredientsItem,
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every((item) => {
          return item.id && item.name && item.unit;
        });
      },
    },
  },
  emits: ["set-quantity", "remove"],
  setup(props, { emit }) {
    const setQuantity = (ingredientId, quantity) => {
      emit("set-quantity", ingredientId, quantity);
    };
    const removeItem = (ingredientId) => {
      emit("remove", ingredientId);
    };
    return { setQuantity, removeItem };
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  gap: 0.25rem;
  margin-top: 1rem;
  &__title {
    font-size: 0.75rem;
    font-weight: 400;
  }
}
</style>
