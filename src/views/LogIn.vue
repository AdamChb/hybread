<!-- ------------------------------
  Hybread - LogIn.vue

  Mathias BENOIT
  Adam CHABA
  Eva MAROT
  Sacha PORTAL

  This view is the hpage where the user can log in
------------------------------ -->

<!-- TEMP : js connexion -->
<script setup></script>

<template>
  <div class="background">
    <div id="content">
      <div id="form">
        <h1 id="title">Log In</h1>
        <!-- Form to get the username and password to log in -->
        <form>
          <label for="username" class="subject">Username</label>
          <input
            class="input"
            type="text"
            id="username"
            name="username"
            required
          />
          <label for="password" class="subject">Password</label>
          <input
            class="input"
            type="password"
            id="password"
            name="password"
            required
          />
          <!-- Button to sumit the form -->
          <button type="submit" id="submit">Log In</button>
          <!-- Link the the sign up page if the user doesn't have an account -->
          <p id="signup">
            You don’t have an account ?
            <router-link to="/signIn">Register now</router-link>
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

#submit {
  padding: 0.5em;
  width: 17%;
  border-radius: 15px;
  background-color: #0a859a;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

#signup {
  margin-top: 1em;
  font-size: 1em;
}

#signup a {
  color: #0a859a;
  text-decoration: none;
}

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
