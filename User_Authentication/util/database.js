const Sequelize = require("sequelize");

const sequelize = new Sequelize("expensetracker", "root", "Salman@121", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
