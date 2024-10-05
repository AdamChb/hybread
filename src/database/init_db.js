//Load File System, mysql2 and path module
const fs = require("fs");
const mysql = require("mysql2");
const path = require("path");

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hybread_root",
  password: "efreihybread240",
  database: "hybread",
});

async function APIBookCall(keybook) {
  // API link to get the book
  const linkWork = `https://openlibrary.org${keybook}.json`;
  return await fetch(linkWork)
    .then((res) => res.json())
    .then(async (work) => {
      const returnBook = {
        key: work.key,
        title: work.title,
      };
      if (typeof work.description === "object") {
        returnBook.description = work.description.value;
      } else {
        returnBook.description = work.description;
      }

      const linkEditions = `https://openlibrary.org${keybook}/editions.json`;
      return await fetch(linkEditions)
        .then((res) => res.json())
        .then((editionsResponse) => {
          const editions = editionsResponse.entries;
          for (const edition of editions) {
            if (edition.isbn_13 || edition.isbn_10) {
              returnBook.isbn = edition.isbn_13
                ? edition.isbn_13[0]
                : edition.isbn_10[0];
              break;
            }
          }
          return returnBook;
        });
    });
}

async function APICoverCall(coverId) {
  const linkCover = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  return await fetch(linkCover).then(async (response) =>
    Buffer.from(await response.arrayBuffer())
  );
}

function saveCover(cover, coverId, subject) {
  // Create directories if they don't exist
  const dirPath = path.join(__dirname, "img", subject);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, `${coverId}.jpg`);
  fs.writeFileSync(filePath, cover);
  return `img/${subject}/${coverId}.jpg`;
}

async function APISubjectCall(subject, limit = 100) {
  if (subject === "textbooks") {
    limit = 300;
  }

  const linkBooks = `https://openlibrary.org/subjects/${subject}.json?limit=${limit}`;
  return await fetch(linkBooks)
    .then((res) => res.json())
    .then((data) => {
      const books = data.works || [];
      return books
        .filter((book) => book.cover_id)
        .map((book) => ({
          key: book.key,
          title: book.title,
          coverId: book.cover_id,
          author: book.authors[0].name,
        }));
    });
}

function bookExists(book) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT ISBN FROM Book WHERE ISBN = ?",
      [book.isbn],
      (err, results) => {
        if (err) reject(err);
        resolve(results.length > 0);
      }
    );
  });
}

function insertBooks(books) {
  books.forEach((book) => {
    db.query(
      "SELECT Id_Category FROM Category WHERE Name_Category = ?",
      [book.category],
      (err, results) => {
        if (err) throw err;
        const categoryId = results[0].Id_Category;

        db.query(
          "INSERT INTO Book (Name_Book, Author, Summary, ISBN, Cover_Book, Id_Category) VALUES (?, ?, ?, ?, ?, ?)",
          [
            book.title,
            book.author,
            book.description,
            book.isbn,
            book.cover,
            categoryId,
          ],
          (err) => {
            if (err) throw err;
          }
        );
      }
    );
  });
}

function insertSubjects(subjects) {
  subjects.forEach((subject) => {
    db.query(
      "INSERT INTO Category (Name_Category) VALUES (?)",
      [subject],
      (err) => {
        if (err) throw err;
      }
    );
  });
}

async function doAll() {
  const mapDb = {
    juvenile_literature: "Children's books",
    science_fiction: "Science fiction",
    thriller: "Thriller",
    history: "Historical",
    textbooks: "Educational",
  };

  // Insert subjects into the database
  insertSubjects(Object.values(mapDb));

  for (const [apiSubject, dbSubject] of Object.entries(mapDb)) {
    const listSubject = await APISubjectCall(apiSubject);
    const listBooks = [];

    for (const book of listSubject) {
      try {
        const bookData = await APIBookCall(book.key);
        bookData.coverId = book.coverId;
        bookData.category = dbSubject;
        bookData.author = book.author;

        if (!bookData.description) {
          continue;
        }

        if (await bookExists(bookData)) {
          continue;
        }

        if (listBooks.length >= 50) break;
        listBooks.push(bookData);
      } catch (error) {
        console.error(error);
      }
    }

    // Get covers and insert books into the database
    for (const book of listBooks) {
      book.cover = saveCover(
        await APICoverCall(book.coverId),
        book.coverId,
        apiSubject
      );
    }
    insertBooks(listBooks);
  }

  db.end();
}

module.exports = { doAll };
