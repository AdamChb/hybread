<script>
import HeaderHybRead from "./components/HeaderHybRead";
import FooterHybRead from "./components/FooterHybRead";

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
    <router-link to="/homepageloggedin">HomepageLoggedin</router-link> |
    <router-link to="/signin">SignIn</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/account">AccountPage</router-link> |
    <router-link to="/book">Book</router-link> |
  </nav>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
* {
  font-family: inter;
  box-sizing: border-box;
  margin: 0;
  /* scrollbar-color:  #effdff;
  scrollbar-width: thin; */

}

::-webkit-scrollbar-thumb {
  background-color: #0a859a;
  border: 4px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;  
}

::-webkit-scrollbar {
  width: 16px;
}
</style>
