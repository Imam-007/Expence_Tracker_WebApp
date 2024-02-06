const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Expense = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  expenseamount: Sequelize.STRING,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
});

module.exports = Expense;
