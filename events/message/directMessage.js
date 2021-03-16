const { MessageEmbed } = require("discord.js");
const { User } = require("../../models");

module.exports = (client, message) => {
  if (message.author.bot) return;
  console.log('test')

  const embed = new MessageEmbed()
    .setAuthor(`${user.username}`)
    .setColor("#ffa500")
    .setDescription(`**Action**: ouverture ticket\n**Raison**: ${message.content}\nUtilisateur: ${user.tag}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
  message.author.send("Nous avons reçu votre ticket, on vous répondra dès que possible!");
  client.channels.cache.get('727475181957677146').send(embed)
}