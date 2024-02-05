const express = require("express");

const userController = require("../contrlollers/user");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.checkUser);

module.exports = router;
