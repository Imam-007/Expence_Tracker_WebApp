const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//Add transaction POST Mathod
router.post("/add-transaction", addTransaction);
//Edit transaction POST Mathod
router.post("/edit-transaction", editTransaction);
//Delete transaction POST Mathod
router.post("/delete-transaction", deleteTransaction);

//get transaction POST Method
router.post("/get-transaction", getAllTransaction);

module.exports = router;
