const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Lấy danh sách đơn hàng của người dùng
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { UserID: req.params.userId } });
        res.json(orders);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Tạo đơn hàng mới
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const order = await Order.create({ UserID: userId, ProductID: productId, Quantity: quantity });
        res.status(201).send({ success: true, message: 'Order placed successfully' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error placing order', error: err });
    }
});

module.exports = router;
