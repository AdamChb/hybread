<!-- ------------------------------
  Hybread - AccountPage.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page where the user can see his account information
------------------------------ -->

<script>
import BookCard from "@/components/BookCard.vue";
import ChartCategory from "@/components/ChartCategory.vue";

export default {
  name: "AccountPage",
  components: {
    BookCard,
    ChartCategory,
  },
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      books: [],
    };
  },
  async beforeMount() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/auth/likedbooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const bookList = await response.json();

    let user;
    if (token) {
      user = JSON.parse(atob(token.split(".")[1]));
    } else {
      user = { id: 0};
    }

    bookList.forEach(async (book) => {
      console.log(book);
      const response_1 = await fetch(`http://localhost:3000/api/books/book/${user.id}/${book.ID_Book}`);
      const data_1 = await response_1.json();
      this.books.push(data_1[0]);
    });
  },
  methods: {
    disconnect() {
      localStorage.removeItem("token");
      this.$emit(`loggedInUpdate`);
      this.$router.push("/");
    },
    changePassword() {
      const oldPassword = prompt("Enter your current password : ", "");

      const password = document.getElementById("password").value;
      document.getElementById("password").value = "";
      const token = localStorage.getItem("token");

      fetch("http://localhost:3000/api/auth/updatepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ 
          newPassword: password,
          oldPassword: oldPassword,
        }),
      });
    },
    changeEmail() {
      const password = prompt("Enter your password : ", "");

      const email = document.getElementById("email").value;
      document.getElementById("email").value = "";
      const token = localStorage.getItem("token");

      fetch("http://localhost:3000/api/auth/updateemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ 
          password: password,
          email: email,
        }),
      });
    }
  },
};
</script>

<template>
  <div class="background">
    <div class="content">
      <div class="account">
        <!-- Left block : user account and graph -->
        <div class="left-block">
          <div class="your-account">
            <h2>Your account</h2>
            <!-- Username change -->
            <div class="input-group">
              <input type="text" id="email" placeholder="Current email" />
              <button @click="changeEmail">Change username</button>
            </div>
            <!-- Password change -->
            <div class="input-group">
              <input type="password" id="password" placeholder="*************" />
              <button @click="changePassword">Change password</button>
            </div>
          </div>
          <!-- Graph -->
          <div class="graph">
            <ChartCategory />
          </div>
        </div>
        <!-- Favourites section -->
        <div class="favourites">
          <h2>My favourites</h2>
          <div class="shelf">
            <div v-for="book in books" :key="book.id">
              <BookCard :book="book" :isLoggedIn="isLoggedIn"/>
            </div>
          </div>
        </div>
      </div>
    
      <div class="disconnect">
        <button @click="disconnect">Disconnect</button>
      </div>
    </div>
  </div>
</template>

<!-- Style of the page -->
<style scoped>
.background {
  background-image: url("../assets/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 6vw 10vw;
  background: rgba(0, 0, 0, 0.3);
  gap: 2em;
  padding-bottom: 2em;
}

.account {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  height: auto;
  width: 100%;
}

.left-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 72vh;
  animation: fadeInLeft ease 1s;
  margin-right: 1.5em;
}

.your-account {
  background-color: white;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  border-radius: 0.4em;
  margin-bottom: 1.5em;
  height: 35%;
}

.your-account h2 {
  margin-bottom: 1em;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;
}

.input-group input {
  width: 60%;
  padding: 0.5em;
  margin-right: 0.5em;
  border: 2px solid black;
  border-radius: 0.4em;
  transition: .3s;
}

.input-group input:hover, .input-group input:focus {
transform: scale(1.04);
transition: .3s;
}

.input-group button {
  padding: 0.5em 1em;
  background-color: #0a859a;
  color: white;
  border: none;
  border-radius: 0.4em;
  cursor: pointer;
  transition: 0.3s;
}
.input-group button:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

.graph {
  background-color: white;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  border-radius: 0.4em;
  height: 60%;
}

.favourites {
  display: flex;
  flex-direction: column;
  width: 58%;
  height: 72vh;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  border-radius: 0.4em;
  padding: 1.5em 0 0 0;
  animation: fadeInRight ease 1s;
}

.favourites h2 {
  margin-bottom: 0;
  padding-left: 1.5em;
}

.shelf {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  padding-left: 0;
  width: 100%;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  height: 100%;
  overflow-y: scroll;
}

.disconnect {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
}

.disconnect button {
  box-sizing: border-box;
  font-weight: 400;
  font-size: 1em;
  background-color: red;
  display: inline-block;
  padding: 0.5em 1em;
  width: fit-content;
  text-align: center;
  border-radius: 0.4em;
  color: white;
  transition: 0.3s;
  border: none;
}

.disconnect button:hover {
  cursor: pointer;
}

@media only screen and (max-width: 1050px) {
  .background {
    height: auto;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .left-block {
    margin: 5em 0 1.5em 0;
    width: 100%;
    height: auto;
  }

  .input-group {
    justify-content: center;
  }
  .your-account{
    height: auto;
  }

  .favourites {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .input-group input,
  .input-group button {
    font-size: 0.8em;
  }

  .favourites h2 {
    font-size: 1.2em;
  }
}
</style>
