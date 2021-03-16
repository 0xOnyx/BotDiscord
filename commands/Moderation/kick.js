
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  if (!message.guild.me.hasPermission('KICK_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
    message.channel.send(`Je n'ai pas la permission ADMINISTRATEUR ou la permission KICK_MEMBER, donc je ne peux pas kick ce membre`).catch()
  } else {
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
  user.send(`Vous avez ete kick de **${message.guild.name}**.\n **Raison:** ${reason}`)
  user ? message.guild.member(user).kick(reason) : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    message.channel.send(`${user} a ete kick.\n**Raison:** ${reason}`);

    if(!settings.logChannel || settings.logChannel === 'none') return;
    client.channels.cache.get(settings.logChannel).send(embed);
  }

} if (settings.langue === 'en') {
  if (!message.guild.me.hasPermission('KICK_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
    message.channel.send(`I don't have ADMINISTRATOR permission or KICK_MEMBER permission, so I can't kick this member`).catch()
  } else {
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'No reason specified');
  user.send(`You were kicked by **${message.guild.name}**.\n **Reason:** ${reason}`)
  user ? message.guild.member(user).kick(reason) : message.channel.send("The user does not exist.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: kick\n**Reason**: ${reason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    message.channel.send(`${user} was kicked.\n**Reason:** ${reason}`);

    if(!settings.logChannel || settings.logChannel === 'none') return;
    client.channels.cache.get(settings.logChannel).send(embed);
  }
}
};

module.exports.help = {
  name: "kick",
  aliases: ['kick'],
  category: 'moderation',
  description: "Kick un utilisateur",
  cooldown: 10,
  usage: '<@user> <raison>',
  isUserAdmin: true,
  permissions: true,
  args: true
};