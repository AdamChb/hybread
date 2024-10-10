const Books = require('../models/bookModel');

const getBooks = async (req, res) => {
    try {
        Books.getBooks((err, books) => {
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
    try {
        Books.getBookById(req.params.id, (err, book) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(book);
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

module.exports = { getBooks, getBooksByCategory, getBookCoverById, getBookById, getTopBooks };