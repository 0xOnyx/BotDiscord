const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: {
    "type": String,
    "default": defaults.prefix
  },
  logChannel: {
    "type": String,
    "default": defaults.logChannel
  },
  langue: {
    "type": String,
    "default": defaults.langue
  },
  captcha: {
    "type": String,
    "default": defaults.captcha
  },
  captchaRole: {
    "type": String,
    "default": defaults.captchaRole
  },
  welcomeMessage: {
    "type": String,
    "default": defaults.welcomeMessage
  },
  welcomeChannel: {
    "type": String,
    "default": defaults.welcomeChannel
  },
  leaveMessage: {
    "type": String,
    "default": defaults.leaveMessage
  },
  leaveChannel: {
    "type": String,
    "default": defaults.leaveChannel
  },
  raidMode: {
    "type": String,
    "default": defaults.raidMode
  },
  antiLien: {
    "type": String,
    "default": defaults.antiLien
  },
  antiSpam: {
    "type": String,
    "default": defaults.antiSpam
  },
  muteTime: {
    "type": String,
    "default": defaults.muteTime
  },
  antiInsulte: {
    "type": String,
    "default": defaults.antiInsulte
  },
  VIP: {
    "type": Boolean,
    "default": defaults.VIP
  },
});

module.exports = mongoose.model("Guild", guildSchema);