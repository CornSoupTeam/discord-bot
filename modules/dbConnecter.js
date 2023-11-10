const userSchema = require("../models/studentInfo");
const inviteSchema = require("../models/inviteInfo");

const { DATABASE_URL } = require("../config.json");
const mongoose = require("mongoose");

mongoose.connect(DATABASE_URL).catch((error) => console.log(error));

const userController = mongoose.model("user", userSchema);
const inviteController = mongoose.model("invite", inviteSchema);

module.exports = { userController, inviteController };
