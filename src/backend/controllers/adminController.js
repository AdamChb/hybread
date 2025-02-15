const Admin = require("../models/adminModel");

const deleteBook = async (req, res) => {
    const isAdmin = req.user.admin;

    if (!isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        Admin.deleteBook(req.params.id, (err, book) => {
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

const modifyBook = async (req, res) => {
    const isAdmin = req.user.admin;

    if (!isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        Admin.modifyBook(req.body, Number(req.params.id), (err, book) => {
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

const addBook = async (req, res) => {
    const isAdmin = req.user.admin;

    if (!isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        Admin.addBook(req.body, (err, book) => {
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

const addBookCover = async (req, res) => {
    const isAdmin = req.user.admin;

    if (!isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        Admin.addBookCover(req.body, (err, book) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(book);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { deleteBook, modifyBook, addBook, addBookCover };

