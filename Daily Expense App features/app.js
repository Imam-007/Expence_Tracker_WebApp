// //starting of app.js

const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const User = require("./models/users");
const Expense = require("./models/expenseModel");

const app = express();

const userRoutes = require("./routes/userRoute");
const expenseRoutes = require("./routes/expenseRoute");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({ extended: false }));

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

app.use("/home", (req, res, next) => {
  res.sendFile("expenses.html", { root: "views" });
});

app.use("/signup", (req, res, next) => {
  res.sendFile("signup.html", { root: "views" });
});

app.use((req, res, next) => {
  res.sendFile("login.html", { root: "views" });
});

User.hasMany(Expense);
Expense.belongsTo(User);

async function initiate() {
  try {
    await sequelize.sync();
    app.listen(3000, () => {
      console.log(`Server running on port 3000...`);
    });
  } catch (error) {
    console.log(error);
  }
}

initiate();
