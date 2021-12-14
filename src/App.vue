<template>
  <div>
    <app-navigation></app-navigation>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavigation from "./components/base/AppNavigation.vue";

export default {
  components: { AppNavigation },
};
</script>

<style lang="scss">
@use "./assets/styles/index.scss" as *;
@include css-reset();
@include font-face("Roboto", "roboto", 400, "normal");
html {
  font-family: "Roboto", sans-serif;
  color: $grey-dark;
}
#content {
  max-width: 48rem;
  margin: 0 auto;
  padding: 3rem 0;
}
</style>
