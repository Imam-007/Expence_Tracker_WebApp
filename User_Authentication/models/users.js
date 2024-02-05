// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const User = sequelize.define("Users", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: false,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: Sequelize.STRING,
// });

// module.exports = User;
// models/user.js

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
