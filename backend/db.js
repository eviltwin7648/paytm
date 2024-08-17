const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(`${process.env.MONOGODB_URI}`)
  .then((res) => {
    console.log("Connected To DB");
  })
  .catch((err) => console.log(`Error Connecting to DB ${err}`));

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
