const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const pikachu = await fetch("https://some-random-api.ml/img/pikachu")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(pikachu);

  message.channel.send(embed);
};

module.exports.help = {
  name: "pikachu",
  aliases: ['pikachu', 'pika'],
  category: 'images',
  description: "Renvoie la photo de pikachu",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};