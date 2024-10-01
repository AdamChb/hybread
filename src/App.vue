<script>
import HeaderHybRead from "./components/HeaderHybRead";
import FooterHybRead from "./components/FooterHybRead";
/*import BookView from "./views/BookView.vue";
import HomePage from "./views/HomePage.vue";
import CategoryPage from "./views/CategoryPage.vue";
import About from "./views/About.vue";
import { createRouter, createWebHistory } from "vue-router";*/

export default {
  name: "App",
  components: {
    HeaderHybRead,
    FooterHybRead,
  },
};
</script>

<template>
  <HeaderHybRead />
  <router-view />
  <FooterHybRead />
  <nav>
    <router-link to="/">HomePage</router-link> |
    <router-link to="/category">CategoryPage</router-link> |
    <router-link to="/Homepageloggedin">HomepageLoggedin</router-link> |
    <router-link to="/signin">SignIn</router-link> |
    <router-link to="/login">Login</router-link> |
  </nav>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
* {
  font-family: inter;
}
</style>
