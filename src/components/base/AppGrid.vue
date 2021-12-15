<template>
  <div class="grid"><slot></slot></div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
