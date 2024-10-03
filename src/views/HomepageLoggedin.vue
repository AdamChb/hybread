<script>
import BookCard from "@/components/BookCard.vue";

export default {
  name: "HomePage",
  components: {
    BookCard,
  },
  data() {
    return {
      quantity: 0,
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
          <h3>Minimal Quantity</h3>
          <input type="range" min="0" max="50" v-model="quantity" />
          <p>{{ quantity }}</p>
        </div>
        <div class="shelf">
          <div v-for="book in books" :key="book.id">
            <BookCard :book="book"/>
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
  padding: 0 7vw;
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
  justify-content: flex-start;
  align-items: flex-start;
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
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: column;
  text-align: left;
  padding: 1em;
  width: 100%;
}
label{
  display: inline-flex;
  padding: .3em 0;
  cursor: pointer;
  align-items: center;
}

input[type="radio"] {
  border: 3px solid #0a859a;
  border-radius: 50%;
  height: 1.2em;
  width: 1.2em;
  margin-right: .5em;
  appearance: none;
  cursor: pointer;
  transition: .1s;
}

input:checked {
  background-color: #0a859a;
  transition: .1s;
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


@media only screen and (max-width: 1100px) {
  /* Switch the activated content when 
  screen's width is lower than 1100px */
  .container1{
    padding-top: 8em;
    justify-content: flex-start;
  }
  .container3 {
    flex-direction: column;
  }
  .filter{
    width: 100%;
    margin-right: 0;
    margin-bottom: 1em;
    height: auto;
  }
  .shelf{
    width: 100%;
    height: auto;}
  }
</style>
