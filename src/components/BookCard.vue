<!-- ------------------------------
  Hybread - BookCard.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This component is the book card.
------------------------------ -->

<!-- TEMP : les images fonctionnent po -->

<script>
export default {
  name: "BookCard",
  props: {
    book: Object,
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
  <div class="book">
    <router-link to="/book" :book="book">
      <div class="img">
        <img :src="book.cover" alt="book cover" />
      </div>
      <h3>{{ book.name }}</h3>
      <p class="author">{{ book.author }}</p>
    </router-link>

    <!-- Display the number of likes of a book -->
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
    {{ console.log() }}
  </div>
</template>

<!-- Style of the page -->
<style scoped>
.book {
  padding: 1.5em;
  transition: 0.3s;
  border-radius: 0.4em;
  cursor: pointer;
  width: 11em;
}

.book:hover {
  background-color: #effdff;
  transform: scale(1.02);
  transition: 0.3s;
}

a {
  text-decoration: none;
}

.img {
  width: 100%;
  height: 12.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book img {
  width: 8em;
  border-radius: 0.2em;
}

.book h3 {
  font-size: 1em;
  font-weight: 700;
  margin: 0.2em 0 0 0;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book p {
  margin: 0;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
