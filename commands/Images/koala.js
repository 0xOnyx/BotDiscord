const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const koala = await fetch("https://some-random-api.ml/img/koala")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(koala);

  message.channel.send(embed);
};

module.exports.help = {
  name: "koala",
  aliases: ['koala'],
  category: 'images',
  description: "Renvoie la photo d'un koala",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};