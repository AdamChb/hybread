<script>
export default {
  name: "AddBook",
  data() {
    return {
      dragActive: false,
      file: null,
      fileName: "",
      Name_Book: "",
      Author: "",
      ID_Category: 1,
      Stock: 0,
      ISBN: "",
      Summary: "",
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      console.log(file);
      if (file) {
        this.fileName = file.name; // Set the file name
        this.file = file;
      }
    },

    uploadImage() {
      this.$refs.fileInput.click(); // Simulate a click to trigger file input
    },

    onDrop(event) {
      this.dragActive = false; // Reset drag-active state
      const file = event.dataTransfer.files[0]; // Get the dropped file
      console.log(file);
      if (file) {
        this.fileName = file.name; // Set the file name on drop
        this.file = file;
      }
    },

    async addBook() {
      const book = {
        Name_Book: this.Name_Book,
        Author: this.Author,
        ID_Category: this.ID_Category,
        Stock: this.Stock,
        ISBN: this.ISBN,
        Summary: this.Summary,
      };

      const token = localStorage.getItem("token");
      
      const response = await fetch("http://localhost:3000/api/admin/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        const reader = new FileReader();

        reader.onload = async function(event) {
            const arrayBuffer = event.target.result;
            this.base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

            const book = await response.json();

            const response_1 = await fetch("http://localhost:3000/api/admin/addbookcover", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify({
                cover: this.base64String,
                bookId: book[0].ID_Book,
              })
            });
            if (response_1.ok) {
              alert("Book added successfully");
              this.$router.push("/homepageloggedin");
            } else {
              alert("An error occurred");
            }
            console.log('ok');
        };

        reader.readAsArrayBuffer(this.file);
      } else {
        alert("An error occurred");
      }
    }
  }
}
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
          <button class="cta-button" @click="addBook">Add</button>
        </div>

        <!-- Div that contains the book information -->
        <div class="book-container">
          <!-- Photo upload -->
          <div
            class="photo-upload"
            @dragover.prevent
            @drop.prevent="onDrop"
            @dragenter="dragActive = true"
            @dragleave="dragActive = false"
            :class="{ 'drag-active': dragActive }"
          >
            <!-- Upload button stays inside the drop zone -->
            <button class="upload-btn" @click="uploadImage">Upload a photo</button>
            <input
              type="file"
              @change="onFileChange"
              style="display: none"
              ref="fileInput"
            />
            <p>or drop it here</p>

            <!-- Only show the file name, no image preview -->
            <div v-if="fileName">
              <p class="file-name">{{ fileName }}</p>
            </div>
          </div>

          <!-- Second version: Editable inputs with v-model -->
          <div class="book-info">
            <div class="book-header">
              <h2>
                <input
                  id="Name_Book"
                  type="text"
                  v-model="Name_Book"
                  placeholder="Enter book name"
                />
              </h2>
              <div class="text">
                <div class="author">
                  from
                  <input
                    id="Author"
                    type="text"
                    v-model="Author"
                    placeholder="Enter author's name"
                  />
                </div>
                <div class="genre">
                  Genre :
                  <select name="category" id="genre" v-model="ID_Category">
                    <option value="1">Children's books</option>
                    <option value="2">Science fiction</option>
                    <option value="3">Mercedes</option>
                    <option value="4">Thriller</option>
                    <option value="5">Educational</option>
                  </select>
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
                    v-model="Stock"
                    placeholder="Enter quantity"
                  /><br />
                  ISBN :
                  <input
                    id="ISBN"
                    type="text"
                    v-model="ISBN"
                    placeholder="Enter ISBN"
                  />
                </p>
              </div>
              <p class="book-description">
                <textarea
                  id="Summary"
                  v-model="Summary"
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

<style>
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
  margin-bottom: 1em;
  animation: fadeInLeft ease 1s;
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
  width: 100%;
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
  animation: fadeInRight ease 1s;
}

.photo-upload {
  width: 40%;
  height: 12.5rem;
  text-align: center;
  border: 0.125rem dashed #ccc;
  border-radius: 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: pointer;
  transition: border 0.3s ease;
}

.drag-active {
  border-color: #0a859a;
}

.upload-btn {
  background-color: #0a859a;
  color: white;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
}

.upload-btn:hover {
  background-color: #0a859a;
}

.file-name {
  margin-top: 0.625rem;
  font-size: 0.875rem;
  color: #333;
  word-break: break-all;
}

.form-fields {
  width: 55%;
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

.likes {
  padding-top: .5em;
  font-weight: 700;
  color: black;
  display: flex;
  align-items: center;
}

.likes img {
  width: 1em;
  margin-right: 0.2em;
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
  #book-view{
    padding-top: 8em;
    display: block;
  }
  .background {
    height: auto;
  }
}
</style>