const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  neisInfo: {
    type: [
      mongoose.Schema({
        ATPT_OFCDC_SC_CODE: { type: String },
        SD_SCHUL_CODE: { type: String },
        grade: { type: Number, default: 1 },
        class: { type: Number, default: 1 },
      }),
    ],
    required: true,
  },
});

module.exports = userSchema;
