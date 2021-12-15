<template>
  <router-link :to="link" class="meal">
    <app-grid class="meal__content">
      <div>{{ name }}</div>
      <div>{{ carbohydrates }}g</div>
      <div>{{ fats }}g</div>
      <div>{{ protein }}g</div>
      <div>{{ sugars }}g</div>
      <div>{{ saturatedFats }}g</div>
    </app-grid>
  </router-link>
</template>

<script>
import { computed } from "@vue/reactivity";

export default {
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    carbohydrates: { type: Number, required: true },
    sugars: { type: Number, required: true },
    fats: { type: Number, required: true },
    saturatedFats: { type: Number, required: true },
    protein: { type: Number, required: true },
  },
  setup(props) {
    const link = computed(() => {
      return { name: "mealsItem", params: { mealId: props.id } };
    });
    return { link };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.meal {
  &:hover,
  &:focus {
    .meal__content {
      color: $grey-light;
    }
  }
  &__content {
    padding: 0.5em 0;
    border-bottom: 1px solid $grey-dark;
  }
}
</style>
