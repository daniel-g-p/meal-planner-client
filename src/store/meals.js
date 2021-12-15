import apiCall from "../mixins/api-call.js";

export default {
  namespaced: true,
  state: () => {
    return {
      meals: [],
    };
  },
  getters: {
    getAll: (state) => {
      return state.meals;
    },
  },
  mutations: {
    setAll: (state, payload) => {
      state.meals = payload;
    },
  },
  actions: {
    fetchAll: async (context) => {
      const { meals } = await apiCall("meals");
      context.commit("setAll", meals);
    },
  },
};
