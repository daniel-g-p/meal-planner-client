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
          path: "new",
          name: "newIngredient",
          component: () =>
            import("../components/ingredients/IngredientForm.vue"),
        },
        {
          path: "edit/:ingredientId",
          name: "ingredientsItem",
          component: () =>
            import("../components/ingredients/IngredientForm.vue"),
          props: true,
        },
      ],
    },
  ],
};
