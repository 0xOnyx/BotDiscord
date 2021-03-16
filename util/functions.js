const mongoose = require("mongoose");
const Jimp = require("jimp")
const { Guild, User, Warns } = require("../models/index");
const { Message, MessageEmbed } = require("discord.js");
// const role = require("../models/role");

module.exports = client => {
  client.createCaptcha = async captcha2 => {
    const captcha = Math.random().toString(36).slice(2, 8);
    const image = new Jimp(175, 50, 'white');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const textWidth = Jimp.measureText(font, captcha);
    const textHeight = Jimp.measureTextHeight(font, captcha);
    image.print(font, (w/2 - textWidth/2), (h/2 - textHeight/2), captcha);
    image.write(`./captchas/${captcha}.png`);
    return captcha;
  }

  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save()
  };

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return client.config.DEFAULTSETTINGS;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  client.createUser = async user => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
    const createUser = await new User(merged);
    createUser.save();
  };

  client.getUser = async user => {
    const data = await User.findOne({ userID: user.id });
    if (data) return data;
    else return;
  };

  client.getUsers = async guild => {
    const data = await User.find({ guildID: guild.id });
    if (data) return data;
    else return;
  };

  client.updateUser = async (user, settings) => {
    let data = await client.getUser(user);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  // client.getWarns = async user => {
  //   const data = await User.findOne({ userID: user.id });
  //   if (data) return data;
  //   else return;
  // };

  client.addExp = async (client, member, exp) => {
    const userToUpdate = await client.getUser(member);
    const updatedExp = userToUpdate.experience + exp;
    await client.updateUser(member, { experience: updatedExp });
  };

  client.removeExp = async (client, member, exp) => {
    const userToUpdate = await client.getUser(member);
    const updatedExp = userToUpdate.experience - exp;
    await client.updateUser(member, { experience: updatedExp });
  };
};