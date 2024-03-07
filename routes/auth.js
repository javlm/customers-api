const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({ username });
        if (!user) return response.status(404).json({ message: 'User not found' });

        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (!isPasswordOk) return response.status(401).json({ message: 'Password is incorrect' })

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '30m' });

        response.status(200).json({ token })
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Server Error' })
    }
});

module.exports = router;