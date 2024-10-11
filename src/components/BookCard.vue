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
    isLoggedIn: Boolean,
  },
  methods: {
    async toLike(book) {
      if (!this.isLoggedIn) {
        alert("You need to be logged in to like a recipe!");
        return;
      }

      book.Has_Liked = !book.Has_Liked;
      book.Total_Likes += 1;
      
      const response = await fetch("http://localhost:3000/api/auth/likebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bookId: book.Id_Book,
        }),
      });

      if (!response.ok) {
        book.Has_Liked = !book.Has_Liked;
        book.Total_Likes -= 1;
      }
    },
    async unLike(book) {
      if (!this.isLoggedIn) {
        alert("You need to be logged in to like a recipe!");
        return;
      }

      book.Has_Liked = !book.Has_Liked;
      book.Total_Likes -= 1;

      const response = await fetch("http://localhost:3000/api/auth/unlikeBook", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bookId: book.Id_Book,
        }),
      });

      if (!response.ok) {
        book.Has_Liked = !book.Has_Liked;
        book.Total_Likes += 1;
      }
    },

    goTo(bookId) {
      this.$router.push({ name: "BookView", query: { id: bookId } });
    }
  },
};
</script>

<template>
  <div class="book">
    <div @click="goTo(book.Id_Book)">
      <div class="img">
        <img :src="'data:image/jpeg;base64,' + book.Cover_Book" alt="book cover" />
      </div>
      <h3>{{ book.Name_Book }}</h3>
      <p class="author">by {{ book.Author }}</p>
    </div>

    <!-- Display the number of likes of a book -->
    <div class="likes">
      <img
        v-show="!book.Has_Liked"
        @click="toLike(book)"
        src="../assets/not-liked.svg"
        alt="like icon"
      />
      <img
        v-show="book.Has_Liked"
        @click="unLike(book)"
        src="../assets/liked.svg"
        alt="like icon"
      />
      {{ book.Total_Likes }}
    </div>
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
