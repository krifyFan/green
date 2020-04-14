import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import echarts from "echarts";
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

Vue.use(iView);

Vue.prototype.showHisData = function (){
  alert('执行成功');
}

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

