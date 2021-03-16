const mongoose = require("mongoose");

const warningSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  userID: String,
  Warnings: Number,
  Reason: Array,
  Moderater: Array,
  IssueDates: Array,
});

module.exports = mongoose.model('Warns', warningSchema);
