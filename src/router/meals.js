export default {
  path: "/meals",
  component: () => import("../views/Meals.vue"),
  children: [
    {
      path: "",
      name: "meals",
      component: () => import("../components/meals/MealList.vue"),
    },
  ],
};
