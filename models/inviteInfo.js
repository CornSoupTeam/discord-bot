const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  guildId: { type: String, required: true },
  verifyType: { type: String, required: true },
  inviteLimit: { type: Boolean, default: false },
  no_expires: { type: Boolean, required: true },

  urlInfo: {
    type: [
      mongoose.Schema({
        shorturl: { type: String, required: true },
        role: { type: String, required: false },
        expiresAt: { type: Number, required: false },
        number_of_uses: { type: Number, default: 0, required: true },
      }),
    ],
    required: true,
  },
});

module.exports = inviteSchema;
