const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const anime = await fetch(`https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500`)
    .then(res => res.json())
    .then(json => json.data.children);

  const img = anime[Math.floor(Math.random() * anime.length)].data;
  
  const embed = new MessageEmbed()
    .setDescription(img.title)
    .setImage(img.url);

  message.channel.send(embed);
};

module.exports.help = {
  name: "anime",
  aliases: ['anime'],
  category: 'images',
  description: "Renvoie la photo d'un meme anime",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};