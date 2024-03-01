const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//POST || login user
router.post("/login", loginController);

//POST || register user
router.post("/register", registerController);

module.exports = router;
