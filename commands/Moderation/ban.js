const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  if (!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
    message.channel.send(`Je n'ai pas la permission ADMINISTRATEUR ou la permission BAN_MEMBER, donc je ne peux pas bannir ce membre`).catch()
  } else {
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
  user.send(`Vous avez ete ban de **${message.guild.name}**.\n**Raison:** ${reason}`)
  user ? message.guild.member(user).ban({ days: 0, reason: `${reason}` })
 : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#dc143c")
    .setDescription(`**Action**: ban\n**Raison**: ${reason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
    message.channel.send(`${user} a ete ban.\n**Raison:** ${reason}`);
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);
  }
} if (settings.langue === 'en') {
  if (!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
    message.channel.send(`I don't have ADMINISTRATOR permission or BAN_MEMBER permission, so I can't ban this member`).catch()
  } else {
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'No reason specified');
  user.send(`Vous avez ete ban de **${message.guild.name}**.\n**Raison:** ${reason}`)
  user ? message.guild.member(user).ban({ days: 0, reason: `${reason}` })
 : message.channel.send("The user does not exist.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#dc143c")
    .setDescription(`**Action**: ban\n**Reason**: ${reason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
    message.channel.send(`${user} was banned.\n**Reason:** ${reason}`);
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);
  }
}
};

module.exports.help = {
  name: "ban",
  aliases: ['ban'],
  category: 'moderation',
  description: "Ban un utilisateur",
  cooldown: 5,
  usage: '<@user> <raison>',
  isUserAdmin: true,
  permissions: true,
  args: true
};