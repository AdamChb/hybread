<!-- ------------------------------
  Hybread - CategoryPage.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page where the user can see all the books from one category
------------------------------ -->

<script>
import BookCard from "@/components/BookCard.vue";

export default {
  name: "CategoryPage",
  components: {
    BookCard,
  },
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      books: [],
      category: {},
    };
  },
  methods: {
    async getBooks() {
      this.book = [];
      
      const token = localStorage.getItem("token");
      let user;
      if (token) {
        user = JSON.parse(atob(token.split(".")[1]));
      } else {
        user = { id: 0};
      }

      const ID_Category = this.$route.query.id;

      const response = await fetch(`http://localhost:3000/api/category/getcategory/${ID_Category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      this.category = data[0];

      const response_1 = await fetch(`http://localhost:3000/api/books/category/${this.category.ID_Category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data_1 = await response_1.json();
      this.booksId = data_1;

      this.booksId.forEach(async (book) => {
        const response_2 = await fetch(`http://localhost:3000/api/books/book/${user.id}/${book.Id_Book}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data_2 = await response_2.json();
        book = data_2[0];
        this.books.push(book);
        console.log(book);
      });
    }
  },
  watch: {
    '$route.query.id': {
      handler: async function () {
        await this.getBooks();
      },
      immediate: true, 
    }
  },
};
</script>

<template>
  <div id="category">
    <div class="container">
      <!-- TEMP : name category -->
      <h1>{{ category.Name_Category }}</h1>
      <!-- Books display -->
      <div class="shelf">
        <div v-for="book in books" :key="book.id">
          <BookCard :book="book" :isLoggedIn="isLoggedIn"/>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Style of the page -->
<style scoped>
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

#category {
  background-image: url("../assets/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  height: 93vh;
  width: 100%;
  display: flex;
  justify-content: center;
}

h1 {
  font-weight: 700;
  font-size: 3em;
  margin-bottom: 1em;
  animation: fadeInTop ease 1.5s;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 6vw 10vw;
  height: auto;
  width: 100%;
  height: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.3);
}

.shelf {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  padding: 2em;
  width: 100%;
  height: 60vh;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  overflow-y: scroll;
  animation: fadeInBottom ease 1s;
}
</style>
