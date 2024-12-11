const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Đăng ký
router.post('/register', async (req, res) => {
    try {
        const { Username, Password, Email } = req.body;
        const user = await User.create({ Username, Password, Email });
        res.status(201).send({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error registering user', error: err });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const user = await User.findOne({ where: { Username, Password } });
        if (user) {
            res.status(200).send({ success: true, message: 'Login successful' });
        } else {
            res.status(401).send({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error logging in', error: err });
    }
});

module.exports = router;
