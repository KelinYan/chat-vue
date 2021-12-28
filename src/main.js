import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import VueBus from 'vue-bus'
import axios from 'axios'
import router from './router'

Vue.prototype.$axios = axios
Vue.use(VueBus)
Vue.use(Antd);
Vue.config.productionTip = false

new Vue({
  router,

  sockets: { //这里的意思就是把socket挂载到vue的this上,
    //让每个页面都可以通过this.$socket去调用插件里面的方法
    connect: function () {
      console.log('连接上');
    },
    res: function (val) {
      console.log('接收到', val);
    }
  },
  render: h => h(App)
}).$mount('#app')