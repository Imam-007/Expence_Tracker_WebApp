const mongoose = require("mongoose");

//suer Schema design
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timeStamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
