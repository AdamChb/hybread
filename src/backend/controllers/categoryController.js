const Category = require("../models/categoryModel");

const getCategoryById = async (req, res) => {
    try {
        Category.getCategoryById(req.params.id, (err, category) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(category);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategories = async (req, res) => {
    try {
        Category.getCategories((err, categories) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(categories);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getCategoryById, getCategories }