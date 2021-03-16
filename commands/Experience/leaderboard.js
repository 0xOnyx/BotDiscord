const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  const embed = new MessageEmbed()
    .setTitle("Top 10 des utilisateurs sur le serveur")
    .setColor("#a41f14")
    .setThumbnail(`${message.guild.iconURL()}`)
    .setDescription("Le leaderboard du serveur !")
    .setTimestamp()
    .setFooter("Experience")

  await client.getUsers(message.guild).then(p => {
    console.log(p);
    p.sort((a, b) => (a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach(e => {
      embed.addField(e.username, `${e.experience} points d'expérience`);
    });
  });

  message.channel.send(embed);
  }if (settings.langue === 'en') {
    const embed = new MessageEmbed()
    .setTitle("Top 10 users on the server")
    .setColor("#a41f14")
    .setThumbnail(`${message.guild.iconURL()}`)
    .setDescription("The server leaderboard !")
    .setTimestamp()
    .setFooter("Experience")

  await client.getUsers(message.guild).then(p => {
    console.log(p);
    p.sort((a, b) => (a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach(e => {
      embed.addField(e.username, `${e.experience} experience points`);
    });
  });
  }
};

module.exports.help = {
  name: "leaderboard",
  aliases: ['leaderboard', 'classement', 'leadexp', 'exp'],
  category: 'experience',
  description: "Classement d'expérience (top 10) des utilisateurs sur le serveur",
  cooldown: 10,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};