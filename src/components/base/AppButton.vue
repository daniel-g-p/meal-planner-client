<template>
  <button class="button" :class="colorClass" @click="click">
    <slot></slot>
  </button>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    color: {
      type: String,
      default: "green",
      validator: (value) => {
        return ["green", "red", "grey"].includes(value);
      },
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const colorClass = computed(() => {
      if (props.color === "red") {
        return { "button--red": true };
      } else if (props.color === "grey") {
        return { "button--grey": true };
      } else {
        return { "button--green": true };
      }
    });
    const click = () => {
      emit("click");
    };
    return { colorClass, click };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.button {
  padding: 0.5em 1em;
  color: $white;
  cursor: pointer;
  &--green {
    background-color: $green;
    &:hover,
    &:focus {
      background-color: darken($green, 5);
    }
  }
  &--red {
    background-color: $red;
    &:hover,
    &:focus {
      background-color: darken($red, 5);
    }
  }
  &--grey {
    background-color: $grey-dark;
    &:hover,
    &:focus {
      background-color: lighten($grey-dark, 5);
    }
  }
}
</style>
