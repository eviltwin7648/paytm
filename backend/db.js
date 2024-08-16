const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://vishalrai10342:DMlFsSoSYo7cQvEO@paytmv1.s0kky.mongodb.net/?retryWrites=true&w=majority&appName=paytmv1"
  )
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
    maxLength: 9,
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

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
