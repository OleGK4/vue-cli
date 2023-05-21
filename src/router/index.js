import { createRouter, createWebHistory } from "vue-router";

import HomeProducts from "@/views/HomeProducts.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Cart from "@/views/Cart.vue";
import Orders from "@/views/Orders.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeProducts,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
