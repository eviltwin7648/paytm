const express = require("express");
const { Account, User } = require("../db");
const authMiddleware = require("../middleware");
const mongoose = require("mongoose");
const { transferSchema } = require("../types");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const amount = parseInt(req.body.amount);

  const { success } = transferSchema.safeParse({
    userId: req.body.to,
    amount: amount,
  });
  console.log(success);

  if (!success) {
    session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  const toAccount = await Account.findOne({
    userId: req.body.to,
  });
  if (!toAccount) {
    session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account",
    });
  }

  const fromAccount = Account.findOne({ userId: req.userId });
  if (!fromAccount || fromAccount.balance < amount) {
    session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  await Account.updateOne(
    { userId: req.body.to },
    { $inc: { balance: amount } }
  );
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );

  await session.commitTransaction();
  res.json({
    message: "Transaction Successful",
  });
});

module.exports = router;
