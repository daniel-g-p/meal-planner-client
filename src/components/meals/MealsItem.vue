<template>
  <router-link :to="link" class="meal">
    <app-grid class="meal__content">
      <div>{{ name }}</div>
      <div>{{ data.carbohydrates }}g</div>
      <div>{{ data.fats }}g</div>
      <div>{{ data.protein }}g</div>
      <div>{{ data.sugars }}g</div>
      <div>{{ data.saturatedFats }}g</div>
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
    const data = computed(() => {
      return {
        carbohydrates: Math.round(props.carbohydrates * 10) / 10,
        sugars: Math.round(props.sugars * 10) / 10,
        fats: Math.round(props.fats * 10) / 10,
        saturatedFats: Math.round(props.saturatedFats * 10) / 10,
        protein: Math.round(props.protein * 10) / 10,
      };
    });
    return { link, data };
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
