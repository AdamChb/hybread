import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/bookView",
    name: "BookView",
    component: () => import("../views/BookView.vue"),
  },
  {
    path: "/category",
    name: "CategoryPage",
    component: () => import("../views/CategoryPage.vue"),
  },
  {
    path: "/homepageLoggedin",
    name: "HomepageLoggedin",
    component: () => import("../views/HomepageLoggedin.vue"),
  },
  {
    path: "/logIn",
    name: "LogIn",
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
