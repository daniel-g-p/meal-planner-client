<template>
  <div class="textbox">
    <label class="textbox__label" :for="fieldId">{{ label }}</label>
    <input
      class="textbox__input"
      :id="fieldId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="input"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
      validator: (value) => {
        return ["text", "number", "email", "password"].includes(value);
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
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const input = (event) => {
      emit("update:modelValue", event.target.value);
    };
    return { input };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.textbox {
  display: flex;
  flex-direction: column;
  &__label {
    align-self: flex-start;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }
  &__input {
    border: 2px solid $grey-dark;
    padding: 0.5em;
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
