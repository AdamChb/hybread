"""This script is used to insert the data from the API into the database.

/!\ 
FOR THIS SCRIPT TO WORK, THE DATABASE SCRIPT MUST BE RAN ON YOUR COMPUTER FIRST
/!\ 

"""

import os
import requests
import json

import mysql.connector

def APIBookCall(keybook):
    """Call the API and return the list of all needed information of the book in a dict format"""
    
    # API link to get the book
    link_work = "https://openlibrary.org" + keybook + ".json"
    text_work = requests.request("GET", link_work)
    work = json.loads(text_work.text)

    # Return a list of all books with :
    # - key
    # - title
    # - description

    return_book = {"key":work["key"],
            "title":work["title"]}
    if type(work["description"]) == type(dict()):
        return_book["description"] = work["description"]["value"]
    else:
        return_book["description"] = work["description"]
    
    link_editions = "https://openlibrary.org" + keybook + "/editions.json"
    text_editions = requests.request("GET", link_editions)
    editions = json.loads(text_editions.text)

    # Add to the information about the book an ISBN

    for edition in editions["entries"]:
        if "isbn_13" in edition or "isbn_10" in edition:
            return_book["isbn"] = edition["isbn_13"][0]
            break
    return return_book

def APICoverCall(coverId):
    """Call the API and return the cover of the book with coverID in a byte format"""
    
    # API link to get the cover
    link_cover = "https://covers.openlibrary.org/b/id/" + str(coverId) + "-L.jpg"
    text_cover = requests.get(link_cover)
    cover = text_cover.content
    return cover

def saveCover(cover, coverID, subject):
    """Save the cover in the local files and return the path to the image"""
    
    # Create the folders if it doesn't exist
    if not os.path.exists("hybread/src/db/img") :
            os.mkdir("hybread/src/db/img")
    if not os.path.exists("hybread/src/db/img/"+subject):
        os.mkdir("hybread/src/db/img/"+subject)
    
    # Save the cover
    f = open("hybread/src/db/img/" + subject + "/" + str(coverID) + ".jpg","wb")
    f.write(cover) 
    f.close() 
    return "img/" + subject + "/" + str(coverID) + ".jpg"


def APISubjectCall(subject, limit=100):
    """Call the API and return the list of all books of a subject in a list format
    The limit of the number of books is 100 by default, but can be changed"""

    # API link to get all ingredients


    # This subject has a higher limit to make sure there is enough books
    if subject == "textbooks":
        limit = 300

    # API link to get the books of the subject
    link_books = "https://openlibrary.org/subjects/" + subject + ".json?limit=" + str(limit)
    text_books = requests.request("GET", link_books)
    books = json.loads(text_books.text)

    # Return a list of all books with :
    # - key
    # - title
    # - coverId
    # - author
    
    list = []
    if books["works"] is not None:
        for book in books["works"]:
            # If the book doesn't have a cover, it can't be used
            if book["cover_id"] :
                list.append({"key":book["key"],
                            "title":book["title"],
                            "coverId":book["cover_id"],
                            "author":book["authors"][0]["name"]})
    return list

def bookExist(book):
    """Check if the book is already in the database"""

    # Connect to the database
    db = mysql.connector.connect(
        host="localhost",
        user="hybread_root",
        password="efreihybread240",
        database="hybread"
    )

    cursor = db.cursor()
    cursor.execute("SELECT ISBN FROM Book WHERE ISBN = %s;", [book["isbn"]])
    if cursor.fetchall():
        db.commit()
        db.close()
        return True
    db.commit()
    db.close()
    return False


def insertBook(books):
    """Insert a list of book in the database"""

    # Connect to the database
    db = mysql.connector.connect(
        host="localhost",
        user="hybread_root",
        password="efreihybread240",
        database="hybread"
    )

    cursor = db.cursor()
    for book in books:
        # Get the category ID of the book
        cursor.execute("SELECT Id_Category FROM Category WHERE Name_Category = %s;", [book["category"]])
        category = cursor.fetchall()[0][0]

        # Insert the book in the database, with all the required information
        cursor.execute("INSERT INTO Book (Name_Book, Author, Summary, ISBN, Cover_Book, Id_Category) VALUES (%s, %s, %s, %s, %s, %s);", [book["title"], book["author"], book["description"], book["isbn"], book["cover"], category])
    db.commit()
    db.close()
    

def insertSubject(subjects):
    """Insert the subject in the database"""

    # Connect to the database
    db = mysql.connector.connect(
        host="localhost",
        user="hybread_root",
        password="efreihybread240",
        database="hybread"
    )
    cursor = db.cursor()
    for subject in subjects:
        cursor.execute("INSERT INTO Category (Name_Category) VALUES (%s);", [subject])
    db.commit()
    db.close()

def doAll():

    # Map the subject of the API to the subject of the database
    map_db = {
        "juvenile_literature" : "Children's books",
        "science_fiction" : "Science fiction",
        "thriller" : "Thriller",
        "history" : "Historical",
        "textbooks" : "Educational",
    }

    # Insert the subject in the database
    insertSubject(map_db.values())
    for key, value in map_db.items():

        # Get the list of books of the subject
        list_subject = APISubjectCall(key)
        list_book = []
        for book in list_subject:
            try:

                # Get the information of the book
                list_book.append(APIBookCall(book["key"]))

                # Add to the list of information the coverID, the category and the author, infos that can't
                # be found with the Book API
                list_book[-1]["coverId"] = book["coverId"]
                list_book[-1]["category"] = value
                list_book[-1]["author"] = book["author"]

                # If the book is already in the database, it can't be used
                if bookExist(list_book[-1]):
                    list_book.pop()
                    continue

                # If there is already 50 books, stop the loop
                if len(list_book) == 50:
                    break
            except:
                pass

        # Get the cover of the books and save them locally
        for book in list_book[50]:
            book["cover"] = saveCover(APICoverCall(book["coverId"]), book["coverId"], key)

        # Insert the books in the database
        insertBook(list_book[50])


if __name__ == "__main__":
    doAll()