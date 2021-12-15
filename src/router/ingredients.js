export default {
  path: "/ingredients",
  component: () => import("../views/Ingredients.vue"),
  children: [
    {
      path: "",
      name: "ingredients",
      component: () => import("../components/ingredients/IngredientList.vue"),
      children: [
        {
          path: ":ingredientId",
          name: "ingredientsItem",
          component: () =>
            import("../components/ingredients/IngredientForm.vue"),
        },
      ],
    },
  ],
};
