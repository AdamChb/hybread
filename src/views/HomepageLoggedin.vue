<script>
import BookCard from "@/components/BookCard.vue";

export default {
  name: "HomePage",
  components: {
    BookCard,
  },
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      quantity: 0,
      books: [],
      categories: [],
      selectedCategory: '',
      fetchIteration: 0,
    };
  },
  async beforeMount() {
    await this.fetchCategories();
    await this.fetchBooks();
  },
  watch: {
    '$route.query.search': 'fetchBooks',
    selectedCategory: 'fetchBooks',
    quantity: 'fetchBooks'
  },
  methods: {
    async fetchCategories() {
      const response = await fetch("http://localhost:3000/api/category/getcategories");
      const data = await response.json();
      this.categories = data;
    },
    async fetchBooks() {
      this.fetchIteration++;
      let startFetchIteration = this.fetchIteration;
      const token = localStorage.getItem("token");
      let user;
      if (token) {
        user = JSON.parse(atob(token.split(".")[1]));
      } else {
        user = { id: 0 };
      }

      const searchQuery = this.$route.query.search;
      let url = `http://localhost:3000/api/books/search?quantity=${this.quantity}`;

      if (searchQuery) {
        url += `&query=${searchQuery}`;
      }

      if (this.selectedCategory) {
        url += `&category=${this.selectedCategory}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
          this.books = [];
        } else {
          this.books = [];
          for (const bookId of data) {
            if (startFetchIteration !== this.fetchIteration) {
              return;
            }
            const response = await fetch(`http://localhost:3000/api/books/book/${user.id}/${bookId.Id_Book}`);
            const book = await response.json();
            this.books.push(book[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<template>
  <div class="background">
    <div class="container1">
      <h1>Search your next read.</h1>
      <div class="container3">
        <!-- The user can filter the research by category or quantity -->
        <div class="filter">
          <!-- Filter by category -->
          <h3>Category</h3>
          <div class="labels">
            <label v-for="category in categories" :key="category.ID_Category">
              <input
                type="radio"
                name="category"
                :value="category.ID_Category"
                v-model="selectedCategory"
              />
              {{ category.Name_Category }}
            </label>
          </div>
          <!-- Filter by quantity/stock -->
          <h3>Minimal Quantity</h3>
          <input type="range" min="0" max="50" v-model="quantity" />
          <p>{{ quantity }}</p>

          <router-link to="/addbook">
            <button class="addBook" v-if="isLoggedIn">Add a book</button>
          </router-link>
        </div>

        <!-- Display the books -->
        <div class="shelf">
          <div v-if="books.length === 0">
            <h2>No books found</h2>
          </div>
          <div v-else v-for="book in books" :key="book.id">
            <BookCard :book="book" :isLoggedIn="isLoggedIn"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.background {
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
.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 6vw 10vw;
  height: auto;
  width: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
}
.container3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: auto;
  width: 100%;
  padding: 0;
}
h1 {
  font-weight: 700;
  font-size: 3em;
  margin-bottom: 1em;
  animation: fadeInTop ease 1.5s;
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
  width: 77%;
  height: 60vh;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  overflow-y: scroll;
  animation: fadeInRight ease 1s;
}
.filter {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: column;
  text-align: left;
  padding: 2em;
  width: 23%;
  margin-right: 4em;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  height: 60vh;
  animation: fadeInLeft ease 1s;
}
.labels {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: column;
  text-align: left;
  padding: 1em;
  width: 100%;
}
label {
  display: inline-flex;
  padding: 0.3em 0;
  cursor: pointer;
  align-items: center;
}

input[type="radio"] {
  border: 3px solid #0a859a;
  border-radius: 50%;
  height: 1.2em;
  width: 1.2em;
  margin-right: 0.5em;
  appearance: none;
  cursor: pointer;
  transition: 0.1s;
}

input:checked {
  background-color: #0a859a;
  transition: 0.1s;
}

input[type="range"] {
  margin: 1.2em 0;
  background-color: #0a859a;
  cursor: pointer;
  width: 100%;
  appearance: none;
  height: 8px;
  border-radius: 5px;
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #0a859a;
  cursor: pointer;
}
input[type="range"]:focus {
  outline: none;
}

.addBook {
  background-color: #0a859a;
  color: white;
  border: none;
  border-radius: 0.4em;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 1em;
}

.addBook:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

/* Responsive */
@media only screen and (max-width: 1400px) {
  /* Switch the activated content when 
  screen's width is lower than 1400px */
  .container1 {
    padding-top: 8em;
    justify-content: flex-start;
  }
  .container3 {
    flex-direction: column;
  }
  .filter {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1em;
    height: auto;
  }
  .shelf {
    width: 100%;
    height: auto;
  }
}
</style>