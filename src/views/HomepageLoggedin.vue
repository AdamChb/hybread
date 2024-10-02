<script>
export default {
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
      <h1>Search your next read.</h1>
      <div class="container3">
        <div class="filter">
          <h3>Category</h3>
          <div class="labels">
            <label>
              <input
                type="radio"
                name="category"
                value="fiction"
                v-model="selectedCategory"
              />
              Fiction
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="non-fiction"
                v-model="selectedCategory"
              />
              Non-Fiction
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="mystery"
                v-model="selectedCategory"
              />
              Mystery
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="fantasy"
                v-model="selectedCategory"
              />
              Fantasy
            </label>
          </div>
        </div>
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
.container3 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: auto;
  width: 100%;
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
  align-items: center;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  padding: 2em;
  width: 70%;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  height: 60vh;
  overflow-y: scroll;
}
.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  flex-direction: column;
  text-align: left;
  padding: 2em;
  width: 20%;
  margin-right: 1.5em;
  border-radius: 0.4em;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  height: 60vh;
}
.labels {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  flex-direction: column;
  text-align: left;
  padding: 1em;
  width: 100%;
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
.h3 {
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
