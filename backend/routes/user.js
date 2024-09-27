const express = require("express");
const { signUpValidation, signInValidation, updateBody } = require("../types");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = require("../middleware");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { userName, firstName, lastName, password } = req.body;
    const { success } = signUpValidation.safeParse({
      userName,
      password,
      firstName,
      lastName,
    });

    const existingUser = await User.findOne({ userName });
    //if validation succeeds and the user is a new user
    if (!success) {
      return res.status(400).send({
        message: "Incorrect Inputs",
      });
    }
    if (existingUser) {
      return res.status(404).send({
        message: "An account with this username exists",
      });
    }

    const user = await User.create({
      userName,
      password,
      firstName,
      lastName,
    });

    const userId = user._id;
    // create an account  with random balance

    await Account.create({
      userId: userId,
      balance: 1 + Math.floor(Math.random() * 10000),
    });

    const token = jwt.sign({ userId }, JWT_SECRET);

    return res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (err) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const { success } = signInValidation.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Wrong Inputs",
    });
  }
  const user = await User.findOne({ userName: userName, password: password });
  if (!user) {
    return res.status(404).json({
      message: "No Such User",
    });
  }

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    token: token,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
  try {
    await User.findOneAndUpdate(
      {
        _id: req.userId,
      },
      req.body
    );
    return res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
res.send({
    Users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
