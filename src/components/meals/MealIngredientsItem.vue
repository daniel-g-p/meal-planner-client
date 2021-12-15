<template>
  <div class="ingredient">
    <button class="ingredient__remove" @click="close">
      <div class="ingredient__x ingredient__x--1"></div>
      <div class="ingredient__x ingredient__x--2"></div>
    </button>
    <span class="ingredient__name">{{ name }}:</span>
    <input type="number" class="ingredient__input" />
    <span class="ingredient__unit">{{ measuringUnit }}</span>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const measuringUnit = computed(() => {
      if (props.unit === "100g") {
        return "g";
      } else if (props.unit === "100ml") {
        return "ml";
      } else {
        return props.unit;
      }
    });
    return { measuringUnit };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.ingredient {
  display: flex;
  align-items: center;
  &__remove {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    cursor: pointer;
    color: $grey-light;
    &:hover,
    &:focus {
      color: $red;
    }
  }
  &__x {
    width: 50%;
    height: 10%;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: currentColor;
    &--1 {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &--2 {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  &__input {
    border-bottom: 2px solid $grey-dark;
    width: 3rem;
    text-align: center;
    color: $green;
    margin: 0 0.25rem;
    &:hover {
      border-color: $grey-light;
    }
    &:focus {
      border-color: $green;
    }
  }
}
</style>
