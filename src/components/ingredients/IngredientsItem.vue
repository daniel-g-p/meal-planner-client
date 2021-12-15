<template>
  <router-link :to="link" class="ingredient">
    <app-grid class="ingredient__content">
      <div>{{ name }}</div>
      <div>{{ carbohydrates }}g / {{ unit }}</div>
      <div>{{ fats }}g / {{ unit }}</div>
      <div>{{ protein }}g / {{ unit }}</div>
      <div>{{ sugars }}g / {{ unit }}</div>
      <div>{{ saturatedFats }}g / {{ unit }}</div>
    </app-grid>
  </router-link>
</template>

<script>
import { computed } from "@vue/reactivity";

export default {
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    unit: { type: String, required: true },
    carbohydrates: { type: Number, required: true },
    sugars: { type: Number, required: true },
    fats: { type: Number, required: true },
    saturatedFats: { type: Number, required: true },
    protein: { type: Number, required: true },
  },
  setup(props) {
    const link = computed(() => {
      return { name: "ingredientsItem", params: { ingredientId: props.id } };
    });
    return { link };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.ingredient {
  &:hover,
  &:focus {
    .ingredient__content {
      color: $grey-light;
    }
  }
  &__content {
    padding: 0.5em 0;
    border-bottom: 1px solid $grey-dark;
  }
}
</style>
