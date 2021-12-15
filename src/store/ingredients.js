import apiCall from "../mixins/api-call.js";

export default {
  namespaced: true,
  state: () => {
    return {
      ingredients: [],
    };
  },
  getters: {
    getAll: (state) => {
      return state.ingredients;
    },
  },
  mutations: {
    setAll: (state, payload) => {
      state.ingredients = payload;
    },
  },
  actions: {
    fetchAll: async (context) => {
      const { ingredientList } = await apiCall("ingredients");
      context.commit("setAll", ingredientList);
    },
  },
};
