<template>
  <nav class="nav">
    <ul class="nav__container">
      <li v-for="link in links" :key="link.name" class="nav__item">
        <router-link :to="{ name: link.name }" class="nav__link">{{
          link.label
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  setup() {
    const links = [
      { name: "ingredients", label: "Ingredients" },
      { name: "meals", label: "Meals" },
      { name: "plans", label: "Plans" },
    ];
    return { links };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.nav {
  background-color: $grey-dark;
  padding: 1rem 3rem;
  &__container {
    display: flex;
    gap: 2rem;
    max-width: 48rem;
    margin: 0 auto;
  }
  &__link {
    color: $white;
    &:hover,
    &:focus {
      color: $grey-light;
    }
    &.router-link-active {
      color: $green;
    }
  }
}
</style>
