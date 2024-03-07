const express = require("express");
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../models/User');
const Middleware = require('../middleware/middleware');

router.post("/signup", async (request, response) => {
  try {
    const { username, email, birthday, phone, password } = request.body;

    let user = await User.findOne({ username });
    if (user) return response.status(400).json({ msg: 'Username already exists' });

    const hashPwrd = await bcrypt.hash(password, 8);

    user = new User({
      username: username,
      email: email,
      birthday: birthday,
      phone: phone,
      password: hashPwrd
    });

    await user.save();

    response.status(201).json({ msg: 'User created succesfully' })

  } catch (err) {
    console.error(err)
    response.status(500).json({ msg: 'Server Error' })
  }
});

router.put('/account/:id', Middleware, async (request, response) => {
  try {
    const { id } = request.params;
    const { username, password, email, birthday, phone } = request.body;

    let user = await User.findById(id);
    if (!user) return response.status(404).json({ msg: 'User not found, account data cannot be updated' })

    user.username = username || user.username;
    user.email = email || user.email;
    user.birthday = birthday || user.birthday;
    user.phone = phone || user.phone;

    await user.save();
    response.status(200).json({ msg: 'Account data updated successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/account/:id', Middleware, async (request, response) => {
  try {
    const { id } = request.params;

    let user = await User.findById(id);
    if (!user) return response.status(404).json({ msg: 'User not found' });

    await user.remove();
    
    response.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: 'Server Error' });
  }
})


module.exports = router;