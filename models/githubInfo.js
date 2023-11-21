const mongoose = require("mongoose");

const githubSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  githubId: { type: String, require: true },
});

module.exports = githubSchema;
