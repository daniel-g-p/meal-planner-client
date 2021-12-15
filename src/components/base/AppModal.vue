<template>
  <div class="modal">
    <div class="modal__box">
      <header class="modal__header">
        <h2 class="modal__title">{{ title }}</h2>
        <button class="modal__close" @click="close">
          <div class="modal__x modal__x--1"></div>
          <div class="modal__x modal__x--2"></div>
        </button>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $shadow;
  &__box {
    background-color: $white;
    padding: 1.5rem;
    min-width: 24rem;
    max-width: 36rem;
  }
  &__header {
    display: flex;
    align-items: flex-start;
  }
  &__title {
    font-weight: 400;
    font-size: 1.5rem;
    flex-grow: 1;
  }
  &__close {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    background-color: $grey-light;
    border-radius: 50%;
    margin-left: 1.5rem;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: $red;
    }
  }
  &__x {
    width: 50%;
    height: 10%;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: $white;
    &--1 {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &--2 {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>
