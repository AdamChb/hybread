<!-- ------------------------------
  Hybread - HomePage.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the homepage - the first page where the user arrives
------------------------------ -->

<script>
import BookCard from "@/components/BookCard.vue";

export default {
  name: "HomePage",
  components: {
    BookCard,
  },
  //TEMP : get book from database
  data() {
    return {
      books: [],
    };
  },
  async mounted() {
    const response = await fetch("http://localhost:3000/api/books/top");
    const data = await response.json();
    const bookList = data;
    console.log(bookList);
    
    bookList.forEach(async (book) => {
      console.log(book);
      const response_1 = await fetch(`http://localhost:3000/api/books/book/${book.Id_Book}`);
      const data_1 = await response_1.json();
      this.books.push(data_1[0]);
      console.log(data_1);
    });
  }
};
</script>

<template>
  <div class="background">
    <!-- First container : Presentation & join us now button -->
    <div class="container1">
      <h1>You love books ?</h1>
      <h1>You will love HybRead.</h1>
      <p class="description">
        HybRead is a brand new solution to save any book you love to your
        favorites.
        <br />Join us now to discover our collection and save your favorite
        books !
      </p>
      <!-- Button join us now -->
      <router-link to="/signIn">
        <div class="cta-button">Join us now</div>
      </router-link>
    </div>
  </div>

  <!-- Second container : Most liked books -->
  <div class="container2">
    <h2>Most liked books</h2>
    <div class="shelf">
      <div v-for="book in books" :key="book.id">
        <!-- Book card in component -->
        <BookCard :book="book" />
      </div>
    </div>
  </div>
</template>

<!-- Style of the page -->
<style scoped>
.cta-button {
  box-sizing: border-box;
  border: 2px solid white;
  display: inline-block;
  padding: 0.5em 1em;
  text-align: center;
  border-radius: 0.4em;
  color: white;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s;
  animation: fadeInLeft ease 1.5s;
  margin-top: 2em;
}
.cta-button:hover {
  transform: scale(1.04);
  transition: 0.3s;
}
.description {
  font-size: 1.1em;
  text-align: center;
  margin-top: 1.5em;
  animation: fadeInLeft ease 1.5s;
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
  height: auto;
  width: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.3);
}
h1 {
  font-weight: 700;
  font-size: 3em;
  animation: fadeInTop ease 1.5s;
}
.container2 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: center;
  padding: 3vw 7vw;
  height: auto;
  width: 100%;
  color: white;
  background-color: #0a859a;
}
h2 {
  font-weight: 700;
  font-size: 2.5em;
  animation: fadeInLeft ease 1.5s;
  text-align: left;
  padding-bottom: 0.7em;
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
  border-radius: 0.4em;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
}
</style>
