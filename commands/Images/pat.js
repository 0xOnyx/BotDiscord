const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const pat = await fetch("https://some-random-api.ml/animu/pat")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(pat);

  message.channel.send(embed);
};

module.exports.help = {
  name: "caresse",
  aliases: ['caresse', 'pat'],
  category: 'images',
  description: "Renvoie la photo d'une caresse",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};