<!-- ------------------------------
  Hybread - BookView.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page where the user see more information about a book
------------------------------ -->

<script>
export default {
  name: "BookCard",
  data() {
    return {
      book: {},
      isAdmin: false,
    };
  },
  async beforeMount() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(atob(token.split(".")[1]));

    this.isAdmin = user.admin;

    const ID_Book = this.$route.query.id;

    const response = await fetch(`http://localhost:3000/api/books/book/${ID_Book}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    this.book = data[0];
    console.log(this.book);

    const response_1 = await fetch(`http://localhost:3000/api/category/getcategory/${this.book.ID_Category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data_1 = await response_1.json();
    console.log(data_1);
    this.book.Name_Category = data_1[0].Name_Category;
  },
  methods: {
    async deleteBook() {
      const ID_Book = this.$route.query.id;

      const response = await fetch(`http://localhost:3000/api/admin/deletebook/${ID_Book}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        this.$router.push("/homepageloggedin");
      }
    },
    async changeBook() {
      const ID_Book = this.$route.query.id;
      
      const response = await fetch(`http://localhost:3000/api/admin/modifybook/${ID_Book}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          ID_Book: this.book.ID_Book,
          Name_Book: document.querySelector("input[id=Name_Book]").value,
          Author: document.querySelector("input[id=Author]").value,
          ID_Category: this.book.ID_Category,
          Stock: Number(document.querySelector("input[id=Stock]").value),
          ISBN: document.querySelector("input[id=ISBN]").value,
          Summary: document.querySelector("textarea[id=Summary]").value,
        }),
      });

      if (response.ok) {
        this.$router.push("/homepageloggedin");
      }
    },
    async toLike(book) {
      book.liked = !book.liked;
      book.likes += 1;

      const response = await fetch("http://localhost:3000/api/auth/likebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bookId: book.id,
        }),
      });

      if (!response.ok) {
        book.liked = !book.liked;
        book.likes -= 1;
      }
    },
    async unLike(book) {
      book.liked = !book.liked;
      book.likes -= 1;

      const response = await fetch("http://localhost:3000/api/auth/unlikeBook", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          bookId: book.id,
        }),
      });

      if (!response.ok) {
        book.liked = !book.liked;
        book.likes += 1;
      }
    },
  },
};
</script>

<template>
  <div class="background">
    <div id="book-view">
      <div class="bb-container">
        <div class="buttons">
          <!-- Button to bring the user to the last page -->
        <router-link to="/homepageloggedin" style="text-decoration: none">
          <div class="cta-button">
            <img src="@/assets/back-arrow.svg" alt="arrow icon" />
            Return
          </div>
        </router-link>
        <div class="admin-button" v-if="isAdmin">
          <button class="cta-button" @click="deleteBook">Delete Book</button>
          <button class="cta-button" @click="changeBook">Modify Book</button>
        </div>
        </div>

        <!-- Div that contains the book information -->
        <div class="book-container">
          <!-- Book image -->
          <div class="book-image">
            <img :src="'data:image/jpeg;base64,' + book.Cover_Book" alt="Book Cover" />
          </div>

          <!-- First version: Static display with original code -->
          <div class="book-info" v-if="!isAdmin">
            <div class="book-header">
              <h2>{{ book.Name_Book }}</h2>
              <div class="text">
                <div class="author">from {{ book.Author }}</div>
                <div class="genre">Genre : {{ book.Name_Category }}</div>
              </div>
            </div>
            <div class="book-details">
              <div class="text">
                <p>Quantity available : {{ book.Stock }}<br />ISBN : {{ book.ISBN }}</p>
              </div>
              <p class="book-description">{{ book.Summary }}</p>
            </div>
          </div>

          <!-- Second version: Editable inputs with v-model -->
          <div class="book-info" v-if="isAdmin">
            <div class="book-header">
              <h2>
                <input
                  id="Name_Book"
                  type="text"
                  :value="book.Name_Book"
                  placeholder="Enter book name"
                />
              </h2>
              <div class="text">
                <div class="author">
                  from
                  <input
                    id="Author"
                    type="text"
                    :value="book.Author"
                    placeholder="Enter author's name"
                  />
                </div>
                <div class="genre">
                  Genre :
                  <input
                    id="Name_Category"
                    type="text"
                    :value="book.Name_Category"
                    placeholder="Enter genre"
                  />
                </div>
              </div>
            </div>
            <div class="book-details">
              <div class="text">
                <p>
                  Quantity available :
                  <input
                    id="Stock"
                    type="number"
                    :value="book.Stock"
                    placeholder="Enter quantity"
                  /><br />
                  ISBN :
                  <input
                    id="ISBN"
                    type="text"
                    :value="book.ISBN"
                    placeholder="Enter ISBN"
                  />
                </p>
              </div>
              <p class="book-description">
                <textarea
                  id="Summary"
                  :value="book.Summary"
                  placeholder="Enter book summary"
                ></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Style of the page -->
<style scoped>
.bb-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.cta-button {
  box-sizing: border-box;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4em 1em 0.4em 0.7em;
  text-align: center;
  border-radius: 0.4em;
  color: white;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s;
  animation: fadeInLeft ease 1.5s;
  margin-bottom: 1em;
}
.cta-button:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

.cta-button img {
  width: 20px;
  margin-right: 10px;
}

.admin-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1em;
}

button.cta-button {
  cursor: pointer;
  font-size: 1em;
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

#book-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 6vw 10vw;
}

.book-container {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2em 2.5em;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.book-image img {
  width: 250px;
  height: auto;
  border-radius: 10px;
}

.book-info {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: justify;
}

.book-header h2 {
  font-size: 24px;
  margin: 0;
}

.text {
  display: flex;
  flex-direction: column;
}

.author,
.genre {
  font-size: 16px;
  margin-top: 5px;
  color: #666;
  display: flex;
}

.genre {
  text-align: right;
  flex-wrap: wrap;
}

.book-details {
  margin-top: 10px;
}

.book-description {
  margin-top: 5px;
  color: #333;
  min-height: 10em;
}

.book-description textarea {
  width: 100%;
  min-height: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .book-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .book-image img {
    width: 150px;
  }

  .book-info {
    margin-left: 0;
    margin-top: 20px;
  }
}
</style>
