const transactionalModel = require("../models/transactionalModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transaction = await transactionalModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "All" && { type }),
    });
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionalModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction Deleted");
  } catch ({ error }) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  try {
    await transactionalModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTansaction = new transactionalModel(req.body);
    await newTansaction.save();
    res.status(201).send("Transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
