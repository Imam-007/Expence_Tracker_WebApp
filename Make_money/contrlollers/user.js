const User = require("../models/users");

const bcrypt = require("bcrypt");

function isStringEmpty(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (isStringEmpty(email) || isStringEmpty(password)) {
      return res
        .status(400)
        .json({ message: "email or password is missing", success: false });
    }

    const user = await User.findAll({ where: { email: email } });
    if (user.length > 0) {
      // if (user[0].password === password) {
      //   res
      //     .status(200)
      //     .json({ success: true, message: "User logged in successfully" });
      // } else {
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Password is incorrect" });
      // }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          throw new Error("something went wrong");
        }
        if (result === true) {
          return res
            .status(200)
            .json({ success: true, message: "User logged in successfully" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "password is incorrect" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User Does not exist" });
    }
  } catch (err) {
    res.status(401).json({ message: "username and/or password is incorrect!" });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      isStringEmpty(name) ||
      isStringEmpty(email) ||
      isStringEmpty(password)
    ) {
      return res.status(400).json({ message: "Fill in all fields!" });
    }

    // await User.create({ name, email, password });
    // res.status(201).json({ message: "account created" });

    const saltrouds = 10;

    bcrypt.hash(password, saltrouds, async (err, hash) => {
      await User.create({ name, email, password: hash });
      res.status(201).json({ message: "account created successfully!" });
    });
  } catch (err) {
    res.status(500).json({ message: "error creating an account!" });
  }
};
