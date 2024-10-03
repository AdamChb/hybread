<template>
  <div class="background">
  <div id="book-view">
    <div class="book-container">
    <!-- Book image -->
      <div class="book-image">
        <img src="book_cover.png" alt="Book Cover" />
      </div>
      <!-- Book description -->
      <div class="book-info">
        <div class="book-header">
          <h2>Keleana - L'assassineuse Tome 1</h2>
          <!-- TEMP : ajout coeur like -->
          <div class="text">
            <div class="author">from Sarah J Maas</div>
            <div class="genre">Genre : Science Fiction</div>
          </div>
        </div>
        <div class="book-details">
          <div class="text">
            <p>Quantity available : 3<br />ISBN : 8928663</p>
          </div>
          <p class="book-description">
            À dix-huit ans seulement, Keleana est déjà l'assassineuse la plus
            célèbre.<br /><br />Sa réputation a pourtant attiré l’attention du
            prince Dorian qui lui propose de reconquérir sa liberté. Pour cela,
            elle devra participer à un tournoi contre les voleurs et les assassins
            les plus redoutables du royaume. Le vainqueur sera sacré champion du
            roi et entrera à son service. Les autres seront renvoyés à leur triste
            sort.<br /><br />

            Pour Keleana, perdre n’est pas une option. Mais quand l’un de ses
            adversaires est brutalement tué, puis un autre, elle comprend que
            quelque chose de bien plus important qu’une simple compétition se joue
            à la cour du roi.<br /><br />

            Trouvera-t-elle le coupable avant de devenir victime à son tour ?
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<!-- CSS -->
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

#book-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
}

.book-container {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2em 2.5em;
  border-radius: 10px;
  max-width: 80%;
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
}

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
