const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense_tracker", "root", "Salman@121", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
