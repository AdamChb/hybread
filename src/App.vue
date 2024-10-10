<script>
import HeaderHybRead from "./components/HeaderHybRead";
import FooterHybRead from "./components/FooterHybRead";

export default {
  name: "App",
  components: {
    HeaderHybRead,
    FooterHybRead,
  },
  data() {
    return {
      isLoggedIn: false,
      idUser: 0,
      isAdmin: 0,
    };
  },
  methods: {
    loggedInUpdate(id, admin) {
      this.id_user = id;
      this.isAdmin = admin;
      this.isLoggedIn = this.id_user ? true : false;
    }
  }
};
</script>

<template>
  <HeaderHybRead :isLoggedIn="isLoggedIn"/>
  <router-view :isLoggedIn="isLoggedIn" :idUser="idUser" :isAdmin="isAdmin" @loggedInUpdate="loggedInUpdate"/>
  <FooterHybRead />
  <!-- <nav>
    <router-link to="/">HomePage</router-link> |
    <router-link to="/category">CategoryPage</router-link> |
    <router-link to="/homepageloggedin">HomepageLoggedin</router-link> |
    <router-link to="/signin">SignIn</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/account">AccountPage</router-link> |
    <router-link to="/book">Book</router-link> |
  </nav> -->
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

/* Animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeInTop {
  0% {
    opacity: 0;
    translate: 0 -300px;
  }
  100% {
    opacity: 1;
    translate: 0;
  }
}
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    translate: -300px 0;
  }
  100% {
    opacity: 1;
    translate: 0;
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    translate: 300px 0;
  }
  100% {
    opacity: 1;
    translate: 0;
  }
}
@keyframes fadeInBottom {
  0% {
    opacity: 0;
    translate: 0 300px;
  }
  100% {
    opacity: 1;
    translate: 0;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes slideTop {
  0% {
    translate: 0 -100px;
  }
  100% {
    translate: 0;
  }
}
</style>
