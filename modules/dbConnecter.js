const userSchema = require("../models/studentInfo");
const inviteSchema = require("../models/inviteInfo");
const githubSchema = require("../models/githubInfo");

const { DATABASE_URL } = require("../config");
const mongoose = require("mongoose");

mongoose.connect(DATABASE_URL).catch((error) => console.log(error));

const userController = mongoose.model("user", userSchema);
const inviteController = mongoose.model("invite", inviteSchema);
const githubController = mongoose.model("github", githubSchema);

module.exports = { userController, inviteController, githubController };
