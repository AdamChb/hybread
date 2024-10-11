import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/book",
    name: "BookView",
    component: () => import("../views/BookView.vue"),
  },
  {
    path: "/category",
    name: "CategoryPage",
    component: () => import("../views/CategoryPage.vue"),
  },
  {
    path: "/homepageloggedin",
    name: "HomepageLoggedin",
    component: () => import("../views/HomepageLoggedin.vue"),
  },
  {
    path: "/login",
    name: "LogIn",
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/account",
    name: "AccountPage",
    component: () => import("../views/AccountPage.vue"),
  },
  {
    path: "/addbook",
    name: "AddBook",
    component: () => import("../views/AddBook.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
