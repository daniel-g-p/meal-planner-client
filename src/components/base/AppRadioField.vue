<template>
  <div class="radio">
    <p class="radio__name">{{ label }}</p>
    <div class="radio__fields">
      <label
        v-for="field in fields"
        :key="field.id"
        :for="field.id"
        class="radio__option"
      >
        <input
          type="radio"
          class="radio__input"
          :id="field.id"
          :value="field.id"
          :name="fieldId"
          :checked="field.id === modelValue"
          @change="change"
        />
        <div class="radio__toggle"></div>
        <div class="radio__label">{{ field.label }}</div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every((item) => {
          return item.id && item.label;
        });
      },
    },
    fieldId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const change = (event) => {
      emit("update:modelValue", event.target.value);
    };
    return { change };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.radio {
  &__name {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  &__fields {
    display: flex;
    gap: 1rem;
  }
  &__option {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: $grey-light;
    }
  }
  &__input {
    display: none;
    &:checked {
      & + .radio__toggle {
        background-color: $green;
      }
    }
  }
  &__toggle {
    display: block;
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-radius: 50%;
    margin-right: 0.25rem;
  }
}
</style>
