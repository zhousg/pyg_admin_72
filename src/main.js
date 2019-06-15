import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 引入全局css样式控制文件
import "./assets/css/global.css";
// 引入iconfont图标库样式文件
import "./assets/fonts/iconfont.css";

// 引入和注册elementui组件库
import ElementUI from "element-ui";
Vue.use(ElementUI);

import axios from "./http";
Vue.prototype.$http = axios;

//注册组件
import MyBread from "./components/MyBread";
Vue.component("my-bread", MyBread);

//注册过滤器
import moment from "moment";
Vue.filter("ft", v => {
  // 使用 moment.js 进行日期格式转换
  // 1. npm i moment --save
  // 2. 导入  import moment from 'moment'
  // 3. moment(时间|默认当前时间).format(时间格式|默认格式)
  // 4. HH 24小时制   hh是12小时制
  // 5. 后台返回的时间单位是秒   时间戳单位是毫秒
  return moment(v * 1000).format("YYYY/MM/DD HH:mm:ss");
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
