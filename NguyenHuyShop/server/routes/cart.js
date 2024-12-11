const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Lấy giỏ hàng của người dùng
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findAll({ where: { UserID: req.params.userId } });
        res.json(cart);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Thêm sản phẩm vào giỏ hàng
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.create({ UserID: userId, ProductID: productId, Quantity: quantity });
        res.status(201).send({ success: true, message: 'Product added to cart successfully' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error adding product to cart', error: err });
    }
});

module.exports = router;
