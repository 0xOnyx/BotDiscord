const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const cat = await fetch("https://some-random-api.ml/img/cat")
    .then(res => res.json())
    .then(json => json.link);

  const embed = new MessageEmbed()
    .setImage(cat);

  message.channel.send(embed);
};

module.exports.help = {
  name: "cat",
  aliases: ['cat', 'chat'],
  category: 'images',
  description: "Renvoie la photo d'un chat",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};