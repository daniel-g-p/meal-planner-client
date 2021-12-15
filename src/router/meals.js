export default {
  path: "/meals",
  component: () => import("../views/Meals.vue"),
  children: [
    {
      path: "",
      name: "meals",
      component: () => import("../components/meals/MealList.vue"),
      children: [
        {
          path: "new",
          name: "newMeal",
          component: () => import("../components/meals/MealForm.vue"),
        },
        {
          path: "edit/:mealId",
          name: "mealsItem",
          component: () => import("../components/meals/MealForm.vue"),
          props: true,
        },
      ],
    },
  ],
};
