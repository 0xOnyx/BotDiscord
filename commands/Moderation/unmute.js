
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
  message.delete();
  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

  if (settings.langue === 'fr') {
  if (!user.roles.cache.has(muteRole.id)) return message.reply("L'utilisateur mentionné n'est pas muté!");
  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> n'est plus muté!`);

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor("#35f092")
    .setDescription(`**Action**: unmute`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);
  } if (settings.langue === 'en') {
    if (!user.roles.cache.has(muteRole.id)) return message.reply("The mentioned user is not muted!");
    user.roles.remove(muteRole.id);
    message.channel.send(`<@${user.id}> is no longer muted!`);
  
    const embed = new MessageEmbed()
      .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
      .setColor("#35f092")
      .setDescription(`**Action**: unmute`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
      
      if(!settings.logChannel || settings.logChannel === 'none') return;
    client.channels.cache.get(settings.logChannel).send(embed);
  }
};

module.exports.help = {
  name: "unmute",
  aliases: ['unmute'],
  category: 'moderation',
  description: "Unmute un utilisateur",
  cooldown: 8,
  usage: '<@user>',
  isUserAdmin: true,
  permissions: true,
  args: true
};