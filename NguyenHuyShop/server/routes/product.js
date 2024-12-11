const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Lấy chi tiết sản phẩm
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Thêm sản phẩm mới
router.post('/add', async (req, res) => {
    const { name, price, description, imageUrl, categoryId } = req.body;
    try {
        const product = await Product.create({ Name: name, Price: price, Description: description, ImageUrl: imageUrl, CategoryID: categoryId });
        res.status(201).send({ success: true, message: 'Product added successfully' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error adding product', error: err });
    }
});

module.exports = router;
