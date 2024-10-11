const Books = require('../models/bookModel');

const getBooks = async (req, res) => {
    try {
        Books.getBooks(Number(req.params.limit), (err, books) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(books);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBooksByCategory = async (req, res) => {
    try {
        Books.getBooksByCategory(req.params.category, (err, books) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(books);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookCoverById = async (req, res) => {
    try {
        Books.getBookCoverById(req.params.id, (err, cover) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(cover);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookById = async (req, res) => {
    const info = {
        ID_Reader: req.params.userId,
        ID_Book: req.params.bookId
    }

    try {
        Books.getBookById(info, (err, book) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json(book);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTopBooks = async (req, res) => {
    try {
        Books.getMostLikedBooks((err, books) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(books);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchBooks = async (req, res) => {
    try {
        Books.searchBooks(req.query.query, req.query.category, req.query.quantity, (err, books) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(books);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getBooks, getBooksByCategory, getBookCoverById, getBookById, getTopBooks, searchBooks };