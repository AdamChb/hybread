CREATE DATABASE hybread;

USE hybread;

CREATE TABLE Reader(
   ID_Reader INT AUTO_INCREMENT,
   Pseudo VARCHAR(50) NOT NULL,
   Email VARCHAR(50) NOT NULL,
   Password VARCHAR(250) NOT NULL,
   Admin BOOLEAN NOT NULL,
   PRIMARY KEY(ID_Reader),
   UNIQUE(Pseudo),
   UNIQUE(Email)
);

CREATE TABLE Category(
   ID_Category INT AUTO_INCREMENT,
   Name_Category VARCHAR(50) NOT NULL,
   PRIMARY KEY(ID_Category),
   UNIQUE(Name_Category)
);

CREATE TABLE Book(
   Id_Book INT PRIMARY KEY AUTO_INCREMENT,
   ISBN VARCHAR(50) NOT NULL UNIQUE,
   Name_Book VARCHAR(200) NOT NULL,
   Author VARCHAR(50) NOT NULL,
   Summary VARCHAR(8000) NOT NULL,
   Cover_Book VARCHAR(50),
   ID_Category INT NOT NULL,
   FOREIGN KEY(ID_Category) REFERENCES Category(ID_Category)
);

CREATE TABLE Favourite(
   ID_Reader INT,
   ISBN VARCHAR(50),
   PRIMARY KEY(ID_Reader, ISBN),
   FOREIGN KEY(ID_Reader) REFERENCES Reader(ID_Reader),
   FOREIGN KEY(ISBN) REFERENCES Book(ISBN)
);


CREATE USER 'hybread_root'@'localhost' IDENTIFIED BY 'efreihybread240';
GRANT ALL PRIVILEGES ON hybread.* TO 'hybread_root'@'localhost';
FLUSH PRIVILEGES;