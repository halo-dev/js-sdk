import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import "./permission";

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(router);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
