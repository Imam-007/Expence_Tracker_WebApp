const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'expense_tracker',
//     password: 'rootoor'
// });
// module.exports = pool.promise();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("expense", "root", "Salman@121", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;