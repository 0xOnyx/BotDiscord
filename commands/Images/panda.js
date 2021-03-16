const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const panda = await fetch("https://some-random-api.ml/img/panda")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(panda);

  message.channel.send(embed);
};

module.exports.help = {
  name: "panda",
  aliases: ['panda'],
  category: 'images',
  description: "Renvoie la photo d'un panda",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};