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
    };
  },
  mounted() {
    this.loggedInUpdate();
  },
  methods: {
    loggedInUpdate() {
      this.isLoggedIn =  localStorage.getItem("token") !== null;
    }
  }
};
</script>

<template>
  <HeaderHybRead :isLoggedIn="isLoggedIn"/>
  <router-view @loggedInUpdate="loggedInUpdate" :isLoggedIn="isLoggedIn"/>
  <FooterHybRead />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
* {
  font-family: inter;
  box-sizing: border-box;
  margin: 0;
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
