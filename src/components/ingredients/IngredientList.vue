<template>
  <div>
    <app-title>Ingredients</app-title>
    <app-button>New Ingredient</app-button>
    <main class="ingredients">
      <p v-if="!ingredients.length">
        Add your first ingredient to get started.
      </p>
      <ul v-else class="ingredients__list"></ul>
    </main>
  </div>
</template>

<script>
export default {
  setup() {
    const ingredients = [];
    return { ingredients };
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.ingredients {
  margin-top: 1.5rem;
}
</style>
