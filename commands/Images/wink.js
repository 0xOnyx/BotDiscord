const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const wink = await fetch("https://some-random-api.ml/animu/wink")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(wink);

  message.channel.send(embed);
};

module.exports.help = {
  name: "wink",
  aliases: ['wink'],
  category: 'images',
  description: "Renvoie la photo d'un clin d'oeil",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};