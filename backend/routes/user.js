const express = require("express");
const signUpValidation = require("../types");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  const { success } = signUpValidation.safeParse({
    userName,
    password,
    firstName,
    lastName,
  });
  const existingUser = User.findOne({ userName });
  if (success && !existingUser) {
    const user = await User.create({
      userName,
      password,
      firstName,
      lastName,
    });
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.json({
      message: "User created successfully",
      token: token,
    });
  } else {
    return res.status(411).send({
      msg: "An account with this username exists / Incorrect Inputs",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const { sucess } = signUpValidation.safeParse(req.body);
  if (!sucess) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const user = await User.findOne({ userName: userName, password: password });
  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const userId = user._id;
  
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token: token,
  });
});

module.exports = router;
