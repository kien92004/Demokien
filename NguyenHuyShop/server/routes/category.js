const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Lấy danh sách danh mục
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Thêm danh mục mới
router.post('/add', async (req, res) => {
    const { categoryName } = req.body;
    try {
        const category = await Category.create({ CategoryName: categoryName });
        res.status(201).send({ success: true, message: 'Category added successfully' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error adding category', error: err });
    }
});

module.exports = router;
