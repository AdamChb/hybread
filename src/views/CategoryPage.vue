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
  // TEMP : data from db
  data() {
    return {
      books: [
        {
          cover: "/book1.jpg",
          name: "The Safe Place",
          author: "Anna Downes",
          likes: 1,
          liked: false,
        },
        {
          cover: "/book2.jpg",
          name: "House of Glass",
          author: "Sarah Pekkanen",
          likes: 2,
          liked: false,
        },
        {
          cover: "/book3.jpg",
          name: "Till Death Do Us Part",
          author: "Laure Elizabeth Flynn",
          likes: 3,
          liked: false,
        },
        {
          cover: "/book1.jpg",
          name: "The Safe Place",
          author: "Anna Downes",
          likes: 1,
          liked: false,
        },
        {
          cover: "/book1.jpg",
          name: "The Safe Place",
          author: "Anna Downes",
          likes: 1,
          liked: false,
        },
        {
          cover: "/book2.jpg",
          name: "House of Glass",
          author: "Sarah Pekkanen",
          likes: 2,
          liked: false,
        },
        {
          cover: "/book3.jpg",
          name: "Till Death Do Us Part",
          author: "Laure Elizabeth Flynn",
          likes: 3,
          liked: false,
        },
        {
          cover: "/book1.jpg",
          name: "The Safe Place",
          author: "Anna Downes",
          likes: 1,
          liked: false,
        },
        {
          cover: "/book2.jpg",
          name: "House of Glass",
          author: "Sarah Pekkanen",
          likes: 2,
          liked: false,
        },
        {
          cover: "/book3.jpg",
          name: "Till Death Do Us Part",
          author: "Laure Elizabeth Flynn",
          likes: 3,
          liked: false,
        },
      ],
    };
  },
};
</script>

<template>
  <div id="category">
    <div class="container">
      <!-- TEMP : name category -->
      <h1>Mystery & Thriller</h1>
      <!-- Books display -->
      <div class="shelf">
        <div v-for="book in books" :key="book.id">
          <BookCard :book="book" />
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
