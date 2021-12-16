import { createRouter, createWebHistory } from "vue-router";

import meals from "./meals.js";
import ingredients from "./ingredients.js";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { name: "meals" },
    },
    meals,
    ingredients,
    { path: "/:pathMatch(.*)*", redirect: { name: "meals" } },
  ],
});
