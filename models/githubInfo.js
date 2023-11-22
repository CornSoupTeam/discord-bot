const mongoose = require("mongoose");

const githubSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  githubId: { type: String, require: true },
  channelId: { type: String, require: true },
  guildId: { type: String, require: true },
});

module.exports = githubSchema;
