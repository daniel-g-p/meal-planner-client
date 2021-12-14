import { createApp } from "vue";

import App from "./App.vue";

import AppTitle from "./components/base/AppTitle.vue";
import AppButton from "./components/base/AppButton.vue";
import AppGrid from "./components/base/AppGrid.vue";

import router from "./router.js";

const app = createApp(App);

app.component("AppTitle", AppTitle);
app.component("AppButton", AppButton);
app.component("AppGrid", AppGrid);

app.use(router);

app.mount("#app");
