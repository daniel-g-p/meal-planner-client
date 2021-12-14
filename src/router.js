import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { name: "plans" },
    },
    {
      path: "/plans",
      component: () => import("./views/Plans.vue"),
      children: [
        {
          path: "",
          name: "plans",
          component: () => import("./components/plans/PlanList.vue"),
        },
      ],
    },
    {
      path: "/meals",
      component: () => import("./views/Meals.vue"),
      children: [
        {
          path: "",
          name: "meals",
          component: () => import("./components/meals/MealList.vue"),
        },
      ],
    },
    {
      path: "/ingredients",
      component: () => import("./views/Ingredients.vue"),
      children: [
        {
          path: "",
          name: "ingredients",
          component: () =>
            import("./components/ingredients/IngredientList.vue"),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: { name: "plans" } },
  ],
});
