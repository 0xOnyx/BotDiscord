const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const bird = await fetch("https://some-random-api.ml/img/birb")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(bird);

  message.channel.send(embed);
};

module.exports.help = {
  name: "bird",
  aliases: ['bird', 'oiseau', 'oiseaux'],
  category: 'images',
  description: "Renvoie la photo d'un oiseau",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};