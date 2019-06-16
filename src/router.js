import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Welcome from "./views/Welcome.vue";
import User from "./views/users/User.vue";
import Rights from "./views/auth/Rights.vue";
import Roles from "./views/auth/Roles.vue";
import Categories from "./views/goods/Categories.vue";
import Params from "./views/goods/Params.vue";
import Goods from "./views/goods/Goods.vue";
import GoodsAdd from "./views/goods/GoodsAdd.vue";
import Orders from "./views/order/Orders.vue";

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/",
      redirect: "/welcome"
    },
    {
      // home本身是第2级别路由，内部需要嵌套设置多个第3级别路由
      path: "/home",
      component: Home, // 不要把component成员给去除了
      redirect: "/welcome",
      children: [
        // {path:'/home', redirect:'/welcome'},
        { path: "/users", component: User },
        { path: "/welcome", component: Welcome },
        { path: "/rights", component: Rights },
        { path: "/roles", component: Roles },
        { path: "/categories", component: Categories },
        { path: "/params", component: Params },
        { path: "/goods", component: Goods },
        { path: "/goods/add", component: GoodsAdd },
        { path: "/orders", component: Orders }
      ]
    }
  ]
});

// 路由守卫设置
router.beforeEach(function(to, from, next) {
  var token = window.sessionStorage.getItem("token");
  // 用户没有登录系统(token===null)
  // 该用户还要试图访问除登录以外的其他页面(例如/home)
  // 就强制该用户去登录
  if (token === null && to.path !== "/login") {
    return next("/login");
  }
  next(); // 放行
});

export default router;
