const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const dog = await fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(json => json.message);

  const embed = new MessageEmbed()
    .setImage(dog);

  message.channel.send(embed);
};

module.exports.help = {
  name: "dog",
  aliases: ['dog', 'chien'],
  category: 'images',
  description: "Renvoie la photo d'un chien",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};