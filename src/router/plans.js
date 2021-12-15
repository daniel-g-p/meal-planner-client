export default {
  path: "/plans",
  component: () => import("../views/Plans.vue"),
  children: [
    {
      path: "",
      name: "plans",
      component: () => import("../components/plans/PlanList.vue"),
    },
  ],
};
