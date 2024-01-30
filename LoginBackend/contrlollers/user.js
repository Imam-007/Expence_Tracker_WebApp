const User = require("../models/users");
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
      if (user[0].password === password) {
        res
          .status(200)
          .json({ success: true, message: "User logged in successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
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
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (
      isStringEmpty(name) ||
      isStringEmpty(email) ||
      isStringEmpty(password)
    ) {
      return res.status(400).json({ message: "Fill in all fields!" });
    }
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json({ message: "account created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "error creating an account!" });
  }
};
