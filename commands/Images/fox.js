const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const fox = await fetch("https://randomfox.ca/floof/")
    .then(res => res.json())
    .then(json => json.image);

  const embed = new MessageEmbed()
    .setImage(fox);

  message.channel.send(embed);
};

module.exports.help = {
  name: "fox",
  aliases: ['fox', 'renard'],
  category: 'images',
  description: "Renvoie la photo d'un renard",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};