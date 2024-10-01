<script>
export default {
  data() {
    return {
      books: [
        {
          cover: "src/assets/book1.jpg",
          name: "The Safe Place",
          author: "Anna Downes",
          likes: 1,
          liked: false,
        },
        {
          cover: "src/assets/book2.jpg",
          name: "House of Glass",
          author: "Sarah Pekkanen",
          likes: 2,
          liked: false,
        },
        {
          cover: "src/assets/book3.jpg",
          name: "Till Death Do Us Part",
          author: "Laure Elizabeth Flynn",
          likes: 3,
          liked: false,
        },
        {
          cover: "src/assets/book1.jpg",
          name: "The Safe Place",
          author: "Anna Downes",
          likes: 1,
          liked: false,
        },
        {
          cover: "src/assets/imbook2.jpg",
          name: "House of Glass",
          author: "Sarah Pekkanen",
          likes: 2,
          liked: false,
        },
        {
          cover: "src/assets/book3.jpg",
          name: "Till Death Do Us Part",
          author: "Laure Elizabeth Flynn",
          likes: 3,
          liked: false,
        },
      ],
    };
  },
  methods: {
    toLike(book) {
      book.liked = !book.liked;
      book.likes += 1;
    },
    unLike(book) {
      book.liked = !book.liked;
      book.likes -= 1;
    },
  },
};
</script>

<template>
  <div class="container">
    <!-- TEMP : name category -->
    <h2>Mystery & Thriller</h2>
    <div class="shelf">
      <div class="book" v-for="book in books" :key="book.id">
        <img :src="book.cover" alt="book cover" />
        <h3>{{ book.name }}</h3>
        <p class="author">{{ book.author }}</p>
        <div class="likes">
          <img
            v-show="!book.liked"
            @click="
              toLike(book);
              console.log(book);
            "
            src="../assets/not-liked.svg"
            alt="like icon"
          />
          <img
            v-show="book.liked"
            @click="
              unLike(book);
              console.log('uwu');
            "
            src="../assets/liked.svg"
            alt="like icon"
          />
          {{ book.likes }}
        </div>
        {{ console.log() }}
      </div>
    </div>
  </div>
</template>

<style>
#category {
  background-image: url("../assets/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
}

h2 {
  margin-bottom: 1rem;
}

.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10vw;
  height: auto;
  width: 100%;
  color: white;
}

.shelf {
  display: flex;
  justify-content: center;
  align-items: center;
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
.book {
  padding: 1.5em;
  transition: 0.3s;
  border-radius: 0.4em;
  cursor: pointer;
}
.book:hover {
  background-color: #effdff;
  transform: scale(1.02);
  transition: 0.3s;
}
.book img {
  width: 8em;
  border-radius: 0.2em;
}
.book h3 {
  font-size: 1em;
  font-weight: 700;
  margin: 0.2em 0 0 0;
}
.book p {
  margin: 0;
}
.likes {
  font-weight: 700;
  color: #0a859a;
  display: flex;
  align-items: center;
}
.likes img {
  width: 1em;
  margin-right: 0.2em;
}
</style>
