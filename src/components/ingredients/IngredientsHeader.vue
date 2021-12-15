<template>
  <app-grid class="header">
    <div>Name</div>
    <div>Carbohydrates</div>
    <div>Fats</div>
    <div>Protein</div>
    <div>Sugars</div>
    <div>Saturated Fats</div>
  </app-grid>
</template>

<style lang="scss" scoped>
@use "../../assets/styles/index.scss" as *;
.header {
  color: $green;
  padding: 0.5em 0;
  border-bottom: 1px solid $grey-dark;
}
</style>
