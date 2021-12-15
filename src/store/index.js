import { createStore } from "vuex";

import ingredients from "./ingredients.js";
import meals from "./meals.js";

export default createStore({
  modules: { ingredients, meals },
});
