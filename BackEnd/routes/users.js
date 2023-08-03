const express = require("express");
const router = new express.Router();
const User = require("./../models/User.js");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    const user = await newUser.save();
    console.log(user);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
