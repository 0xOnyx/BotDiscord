const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const hug = await fetch("https://some-random-api.ml/animu/hug")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(hug);

  message.channel.send(embed);
};

module.exports.help = {
  name: "calin",
  aliases: ['calin', 'hug', 'hugs', 'calins'],
  category: 'images',
  description: "Renvoie la photo d'un calin",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};