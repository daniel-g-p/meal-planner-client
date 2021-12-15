import { createRouter, createWebHistory } from "vue-router";

import plans from "./plans.js";
import meals from "./meals.js";
import ingredients from "./ingredients.js";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { name: "plans" },
    },
    plans,
    meals,
    ingredients,
    { path: "/:pathMatch(.*)*", redirect: { name: "plans" } },
  ],
});
