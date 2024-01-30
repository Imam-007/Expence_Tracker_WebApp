// //starting of app.js

const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

const userRoutes = require("./routes/userRoute");

const User = require("./models/users");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({ extended: false }));

app.use("/user", userRoutes);

app.use("/signup", (req, res, next) => {
  res.sendFile("signup.html", { root: "views" });
});

app.use((req, res, next) => {
  res.sendFile("login.html", { root: "views" });
});

async function initiate() {
  try {
    await sequelize.sync();
    app.listen(4000, () => {
      console.log(`Server running on port 4000...`);
    });
  } catch (error) {
    console.log(error);
  }
}

initiate();
