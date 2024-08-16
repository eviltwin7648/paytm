const express = require("express");
const signUpValidation = require("../types");
const { User } = require("../db");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  const isvalidated = signUpValidation.safeParse({
    userName,
    password,
    firstName,
    lastName,
  });
  const isOldUser = User.findOne({ userName });
  if (isvalidated.success && isOldUser) {
    await User.create({
      userName,
      password,
      firstName,
      lastName,
    })
      .then((res) => console.log(res._id))
      .catch((err) => console.log(err));
    await res.send({
      userId: res._id,
    });
  } else {
    res.status(411).send({
      msg: "An account with this username exists / Incorrect Inputs",
    });
  }
});

module.exports = router;
