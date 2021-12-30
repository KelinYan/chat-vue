import Vue from "vue";
import Antd from "ant-design-vue";
import App from "./App";
import "ant-design-vue/dist/antd.css";
import VueBus from "vue-bus";
import axios from "axios";
import router from "./router";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.prototype.$axios = axios;
Vue.use(VueBus);
Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
