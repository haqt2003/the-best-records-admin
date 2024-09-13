import { createRouter, createWebHistory } from "vue-router";
import UsersView from "@/views/UsersView.vue";

const requireAuth = (to, from, next) => {
  const admin = sessionStorage.getItem("usernameAdmin");
  if (!admin) next({ name: "SignIn", params: {} });
  else next();
};

const routes = [
  {
    path: "/",
    name: "User",
    beforeEnter: requireAuth,
    component: UsersView,
  },
  {
    path: "/products",
    name: "Products",
    beforeEnter: requireAuth,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductsView.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignIn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
