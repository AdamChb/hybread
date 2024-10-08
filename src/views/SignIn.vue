<!-- ------------------------------
  Hybread - SignIn.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the page where the user can sign in
------------------------------ -->

<!-- TEMP : js for sign in -->
<script setup></script>

<template>
  <div class="background">
    <div id="content">
      <!-- Form to register -->
      <div id="form">
        <h1 id="title">Sign Up</h1>
        <form>
          <label class="subject" for="username">Username</label>
          <input
            class="input"
            type="text"
            id="username"
            name="username"
            placeholder="ex : pineapplelover"
            required
          />

          <label class="subject" for="email">Email</label>
          <input class="input" type="email" id="email" name="email" placeholder="ex : pineapple.lover@hybread.com" required />

          <label class="subject" for="password">Password</label>
          <input
            class="input"
            type="password"
            id="password"
            name="password"
            placeholder="ex : PiNeApPlE4l!fe"
            required
          />

          <!-- The password is asked twice for verification -->
          <label class="subject" for="repeat-password">Confirm Password</label>
          <input
            class="input"
            type="password"
            id="repeat-password"
            name="repeat-password"
            placeholder="ex : PiNeApPlE4l!fe (again)" 
            required
          />

          <!-- Button to submit the register form -->
          <button type="submit" id="submit" class="button">Sign up</button>

          <!-- Link to the log in page if the user already has an account -->
          <p id="login">
            You already have an account ?
            <router-link to="/logIn">Log in</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- Style of the page -->
<style scoped>
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
#content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 50vh;
  width: 100%;
  padding: 4em 0 2em 0;
  background: rgba(0, 0, 0, 0.3);
}

#form {
  height: auto;
  width: 36vw;
  padding: 2.5em;
  margin: 2em 0 2em 0;
  min-height: 40vh;
  background-color: #ffffff;
  border-radius: 25px;
  animation: fadeInTop ease 1s;
}
#title {
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 1em;
}

.subject {
  font-size: 1em;
  margin-bottom: 0.5em;
  display: block;
}

.input {
  padding: 0.5em;
  margin-bottom: 1em;
  width: 100%;
  border-radius: 5px;
  border: 2px solid black;
}


.button {
  box-sizing: border-box;
  font-weight: 400;
  background-color: #0a859a;
  display: inline-block;
  padding: 0.5em 1em;
  width: 100%;
  text-align: center;
  border-radius: 0.4em;
  color: white;
  transition: 0.3s;
  border: none;
  cursor: pointer;
  font-size: 1em;
}

.button:hover {
  transform: scale(1.04);
  transition: 0.3s;
}

#login {
  margin-top: 1em;
  font-size: 1em;
}

#login a {
  color: #0a859a;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 1000px) {
  #form {
    width: 50vw;
  }
}

@media (max-width: 768px) {
  #form {
    width: 60vw;
  }
}

@media (max-width: 480px) {
  #form {
    width: 70vw;
  }
}
</style>
