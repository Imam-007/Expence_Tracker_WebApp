const Expense = require("../models/expenseModel");

exports.addexpense = (req, res) => {
  const { expenseamount, description, category } = req.body;

  if (expenseamount == undefined || expenseamount.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Parameters missing" });
  }
  Expense.create({ expenseamount, description, category })
    .then((expense) => {
      return res.status(201).json({ expense, success: true });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};

exports.getexpenses = (req, res) => {
  Expense.findAll()
    .then((expenses) => {
      return res.status(200).json({ expenses, success: true });
    })
    .catch((err) => {
      return res.status(500).json({ error: err, success: false });
    });
};

exports.deleteexpense = (req, res) => {
  const expenseid = req.params.expenseid;
  if (expenseid == undefined || expenseid.length === 0) {
    return res.status(400).json({ success: false });
  }
  Expense.destroy({ where: { id: expenseid } })
    .then((noofrows) => {
      if (noofrows === 0) {
        return res.status(404).json({
          success: false,
          message: "Expense doenst belong to the user",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfuly" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ success: true, message: "Failed" });
    });
};
