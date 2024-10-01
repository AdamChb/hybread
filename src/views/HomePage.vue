<script>
export default {
  name: "HomePage",
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
  <div class="background">
    <div class="container1">
      <h1>You love books ?</h1>
      <h1>You will love HybRead.</h1>
      <p class="description">
        HybRead is a brand new solution to save any book you love to your
        favorites.
        <br />Join us now to discover our collection and save your favorite
        books !
      </p>
      <a href=""><div class="cta-button">Join us now</div></a>
    </div>
  </div>
  <div class="container2">
    <h2>Most liked books</h2>
    <div class="shelf">
      <div class="book" v-for="book in books" :key="book.id">
        <img :src="book.cover" alt="book cover" />
        <h3>{{ book.name }}</h3>
        <p class="author">{{ book.author }}</p>
        <div class="likes">
          <img
            v-show="!book.liked"
            @click="toLike(book)"
            src="../assets/not-liked.svg"
            alt="like icon"
          />
          <img
            v-show="book.liked"
            @click="unLike(book)"
            src="../assets/liked.svg"
            alt="like icon"
          />
          {{ book.likes }}
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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
  height: 100vh;
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
  padding: 4em 2em 0 2em;
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
  padding: 10vw;
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
