<template>
  <div class="background">
    <div class="content">
    <!-- Left block : user account and graph -->
      <div class="left-block">
        <div class="your-account">
          <h2>Your account</h2>
          <!-- Username change -->
          <div class="input-group">
            <input type="text" id="username" placeholder="CurrentUsername" />
            <button>Change username</button>
          </div>
          <!-- Password change -->
          <div class="input-group">
            <input type="password" id="password" placeholder="*************" />
            <button>Change password</button>
          </div>
        </div>
        <!-- Graph -->
        <div class="graph">
          <h3>graph</h3>
        </div>
      </div>
      <!-- Favourites section -->
      <div class="favourites">
        <h2>My favourites</h2>
        <div class="favourite-books">
          <div class="book-card">
            <img src="../assets/book1.jpg" alt="Red River Road" />
            <div class="book-info">
              <p><strong>Red River Road</strong></p>
              <p>Anna Downes</p>
              <div class="like">
                <span>5</span>
              </div>
            </div>
          </div>
          <div class="book-card">
            <img src="../assets/book2.jpg" alt="House of Glass" />
            <div class="book-info">
              <p><strong>House of Glass</strong></p>
              <p>Sarah Pekkanen</p>
              <div class="like">
                <span>18</span>
              </div>
            </div>
          </div>
          <div class="book-card">
            <img src="../assets/book3.jpg" alt="Till Death Do Us Apart" />
            <div class="book-info">
              <p><strong>Till Death Do Us Apart</strong></p>
              <p>Laurie Elizabeth Flynn</p>
              <div class="like">
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url("../assets/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  height: auto;
  width: 90%;
  padding: 2em;
  margin-top: 5em;
}

.left-block {
  display: flex;
  flex-direction: column;
  width: 30%;
}

.your-account {
  background-color: white;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  border-radius: 0.4em;
  margin-bottom: 1.5em;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;
}

.input-group input {
  width: 60%;
  padding: 0.5em;
  margin-right: 0.5em;
  border: 1px solid #ddd;
  border-radius: 0.4em;
}

.input-group button {
  padding: 0.5em 1em;
  background-color: #0A859A;
  color: white;
  border: none;
  border-radius: 0.4em;
  cursor: pointer;
}

.favourites {
display: flex;
  flex-direction: column;
  width: 65%;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  border-radius: 0.4em;
  padding: 1.5em;
  overflow-y: scroll;
}

.favourite-books {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1em;
}

.book-card {
  background-color: white;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  border-radius: 0.4em;
  padding: 1em;
  width: 150px;
}

.book-card img {
  width: 100%;
  border-radius: 0.4em;
}

.book-info {
  text-align: center;
  margin-top: 0.5em;
}

.like {
  margin-top: 0.5em;
  font-size: 1.2em;
  color: #007bff;
  text-align: center;
}

@media (max-width: 480px) {
  .input-group input, .input-group button {
    font-size: 0.8em;
  }

  .favourites h2 {
    font-size: 1.2em;
  }

  .book-card img {
    width: 100px;
    height: 150px;
  }
}

</style>
