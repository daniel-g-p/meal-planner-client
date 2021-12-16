<template>
  <div class="ingredient">
    <button class="ingredient__remove" @click="removeItem">
      <div class="ingredient__x ingredient__x--1"></div>
      <div class="ingredient__x ingredient__x--2"></div>
    </button>
    <span class="ingredient__name">{{ name }}:</span>
    <input
      type="number"
      class="ingredient__input"
      placeholder="0"
      :value="formQuantity"
      @input="setQuantity"
    />
    <span class="ingredient__unit">{{ measuringUnit }}</span>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

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
    quantity: {
      type: Number,
      required: true,
    },
  },
  emits: ["set-quantity", "remove"],
  setup(props, { emit }) {
    const formQuantity = ref(0);
    const measuringUnit = computed(() => {
      if (props.unit === "100g") {
        return "g";
      } else if (props.unit === "100ml") {
        return "ml";
      } else if (props.unit === "unit") {
        return "units";
      } else {
        return props.unit;
      }
    });
    const setQuantity = (event) => {
      const { value } = event.target;
      formQuantity.value = value;
      emit("set-quantity", props.id, value);
    };
    const removeItem = () => {
      emit("remove", props.id);
    };
    onMounted(() => {
      formQuantity.value = props.quantity;
    });
    return { formQuantity, measuringUnit, setQuantity, removeItem };
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
    width: 2rem;
    text-align: center;
    color: $green;
    margin: 0 0.25rem;
    &:hover {
      border-color: $grey-light;
    }
    &:focus {
      border-color: $green;
    }
    &::placeholder {
      color: $grey-light;
    }
  }
}
</style>
