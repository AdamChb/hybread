<!-- ------------------------------
  Hybread - HeaderHybRead.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the header.
------------------------------ -->

<script setup>
import { ref } from "vue";
let i = ref(0);
let timeoutId = null;

const toggleMenu = () => {
  document.querySelector(".header_nav_burger").classList.toggle("closethegate");
  document.querySelector(".header_nav_burger").classList.toggle("openthegate");
  document.querySelector("#menu_button").classList.toggle("open");
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (i.value == 1) {
    document.querySelector(".header_nav_burger").classList.toggle("animgate");
  }
  i.value = 1;
};
//  functions for opening and closing the dropdown
function openUnroll() {
  if (timeoutId) {
    clearTimeout(timeoutId); // Cancel the closing of the dropdown if the mouse enters again
  }
  document.getElementById("dropdown").style.display = "block";
}

function closeUnroll() {
  timeoutId = setTimeout(() => {
    document.getElementById("dropdown").style.display = "none";
  }, 300); // 300ms delay before closing the dropdown
}
</script>

<script>
export default {
  props: {
    isLoggedIn: Boolean,
  },
  methods: {
    goTo(categoryId) {
      this.$router.push({ name: "CategoryPage", query: { id: categoryId } });
    },
    searchBook() {
      try {
        this.$router.push({ name: "HomepageLoggedin", query: { search: this.search } });
      } catch (error) {
        console.error(error);
      }
    },
  },
  data() {
    return {
      search: "",
    };
  },
}
</script>

<template>
  <header>
    <!-- Header for pc -->
    <nav id="pc">
      <router-link to='/' class="header_logo">
        <img src="../assets/logo_header.svg" alt="Logo Hybread" />
      </router-link>
      <div @mouseenter="openUnroll" @mouseleave="closeUnroll">
        <div class="categories">Categories</div>
        <ul id="dropdown">
          <li><div @click="goTo(2)">Science Fiction</div></li>
          <li><div @click="goTo(3)">Mystery & Thriller</div></li>
          <li><div @click="goTo(1)">Children's Books</div></li>
          <li><div @click="goTo(5)">Educational</div></li>
          <li><div @click="goTo(4)">Historical</div></li>
        </ul>
      </div>

      <!-- Research bar to search a book -->
      <input
      type="search"
      placeholder="Research a book"
      class="searchbar"
      v-model="search"
      @keyup.enter="searchBook"
      />
      <router-link :to="isLoggedIn ? '/account' : 'login'" class="button">{{ isLoggedIn  ? 'My account' : 'Log in' }}</router-link>

    </nav>

    <!-- Header for mobile -->
    <div id="tel">
      <div id="header_tel">
        <router-link :to="isLoggedIn ? '/homepageloggedin' : '/'" class="header_logo">
          <img src="../assets/logo_header.svg" alt="Logo Hybread" />
        </router-link>

        <!-- Burger button -->
        <div id="menu_button" @click="toggleMenu">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
      </div>

      <!-- Navigation bar for mobile -->
      <nav class="header_nav_burger closethegate">
        <div @click="goTo(2)">Science Fiction</div>
        <div @click="goTo(3)">Mystery & Thriller</div>
        <div @click="goTo(1)">Children's Books</div>
        <div @click="goTo(5)">Educational</div>
        <div @click="goTo(4)">Historical</div>
        <input
          type="search"
          placeholder="Research a book"
          class="mobile-searchbar"
          v-model="search"
          @keyup.enter="searchBook"
        />
        <router-link :to="isLoggedIn ? '/account' : 'login'">{{ isLoggedIn  ? 'My account' : 'Log in' }}</router-link>
      </nav>
    </div>
  </header>
</template>


<style scoped>
/* Styles of the header */
header {
  background-color: white;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1001;
}

header #pc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  z-index: 10;
  background-color: white;
}

#header_tel {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  z-index: 10;
  background-color: white;
  border-bottom: 3px solid #0a859a;
  background-color: white;
}

#tel {
  display: none;
  flex-direction: column;
}

/* Style of the navigation bar for pc */

nav a,
.categories {
  margin-right: 4em;
  font-size: 1em;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  text-decoration: none;
  color: black;
  transition: 0.3s;
  cursor: pointer;
  padding: 0 1.2em;
}

.categories:hover {
  color: #0a859a;
  transform: scale(1.1);
  transition: 0.3s;
}

.button {
  box-sizing: border-box;
  font-weight: 400;
  background-color: #0a859a;
  display: inline-block;
  padding: 0.5em 1em;
  width: 10%;
  text-align: center;
  border-radius: 0.4em;
  color: white;
  transition: 0.3s;
}

.button:hover {
  color: white;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* Style of the categories' dropdown */
#pc ul {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 12em;
  margin-top: 2.5em;
  padding: 0;
  border-radius: 0.5em;
}

#pc ul li {
  list-style: none;
  padding: 0.6em 0;
  transition: 0.3s;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}
#pc ul li:hover {
  background-color: #effdff;
  transition: 0.3s;
  color: #0a859a;
  border-radius: 0.5em;
}

#pc ul li div {
  margin: 0;
  padding-left: .5em;
}

/* Search bar's style */
.searchbar {
  height: 2em;
  box-sizing: border-box;
  width: 40%;
  margin-right: 4em;
  border: solid 2px #0a859a;
  border-radius: 7px;
  padding: 1em;
  transition: 0.3s;
  font-size: 1em;
}

.searchbar:hover {
  transform: scale(1.04);
}

.searchbar:focus {
  transform: scale(1.04);
  outline: none;
}

.searchbar::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 1em;
  width: 1em;
  background-image: url(../assets/cross.png);
  background-size: 1em;
}

.mobile-searchbar {
  box-sizing: border-box;
  width: 100%;
  height: 5vh;
  border-top: solid 3px #0a859a;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  padding: 1.4em;
  transition: 0.3s;
  font-weight: 400;
  margin-right: 0;
  font-size: 2.5vh;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
}

.mobile-searchbar:focus,
.mobile-searchbar:hover {
  outline: none;
  background-color: #effdff;
  transition: 0.3s;
}

.mobile-searchbar::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 1em;
  width: 1em;
  background-image: url(../assets/cross.png);
  background-size: 1em;
}

/* Style of the logo */
header #pc img {
  height: 3em;
  width: auto;
  margin: 1em 0 1em 4em;
  transition: 0.3s;
}

#tel {
  width: 100%;
}

/* Style of the navigation bar for mobile */

/* Animations for the menu */
@keyframes opening {
  0% {
    height: auto;
    margin-top: -35em;
  }
  100% {
    height: auto;
    margin-top: 5em;
  }
}
@keyframes closing {
  0% {
    height: auto;
    margin-top: 5em;
  }
  100% {
    height: auto;
    margin-top: -35em;
  }
}

.openthegate {
  display: flex;
  width: 100%;
  margin-top: 5em;
  height: auto;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  transition: 0.3s;
  animation: opening ease 1.5s;
  z-index: 5;
}
.closethegate {
  display: flex;
  margin-top: -50em;
  width: 100%;
  height: 0;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  transition: 0.3s;
}
.animgate {
  animation: closing ease 1.5s;
}

/* Transforming the burger icon to cross icon */
.open .bar1 {
  transform: rotate(-45deg) translate(-13px, 5px);
}
.open .bar2 {
  opacity: 0;
}
.open .bar3 {
  transform: rotate(45deg) translate(-13px, -5px);
}

.header_nav_burger div, .header_nav_burger a {
  padding: 1.4em;
  font-weight: 400;
  margin-right: 0;
  font-size: 2.5vh;
  display: flex;
  width: 100%;
  height: 5vh;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  color: black;
  text-decoration: none;
}
.header_nav_burger div:hover, .header_nav_burger a:hover {
  background-color: #effdff;
  transition: 0.3s;
}

.header_nav_burger a:last-child {
  display: flex;
  font-size: 2.5vh;
  height: 6vh;
  background-color: #0a859a;
  color: white;
  transition: 0.3s;
}

/* Style for the burger button */
#menu_button {
  height: 31px;
  width: 36px;
  margin-right: 1em;
  cursor: pointer;
  transition: 0.3s;
}

#menu_button:hover {
  transform: scale(1.09);
  transition: 0.3s;
}

#menu_button div {
  height: 5px;
  width: 36px;
  margin-bottom: 8px;
  transition: 0.3s;
  background-color: #0a859a;
  border-radius: 2.5px;
}

header #tel img {
  height: 3.5em;
  width: 100%;
  margin: 0.5em 0 0.5em 1em;
  transition: 0.3s;
}

@media only screen and (max-width: 1050px) {
  /* Switch the activated content when 
  screen's width is lower than 1050px */
  header #pc {
    display: none;
  }

  #tel,
  #header_tel {
    display: flex;
  }
}
</style>
