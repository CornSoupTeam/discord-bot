const userSchema = require("../models/studentInfo");

const { DATABASE_URL } = require("../config");
const mongoose = require("mongoose");

mongoose.connect(DATABASE_URL).catch((error) => console.log(error));

const userController = mongoose.model("user", userSchema);

module.exports = { userController };
