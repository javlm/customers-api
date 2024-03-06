const express = require("express");
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../models/User');

router.post("/signup", async (request, response) => {
  try {
    const { username, email, password } = request.body;

    let user = await User.findOne({username});
    if (user) return response.status(400).json({message:'Username already exists'});

    const hashPwrd = await bcrypt.hash(password, 8);

    user = new User({
        username: username, 
        email:email,
        password: hashPwrd
    });

    await user.save();

    response.status(201).json({message: 'User created succesfully'})

  } catch (err) {
    console.error(err)
    response.status(500).json({message: 'Server Error'})
  }
});

module.exports = router;