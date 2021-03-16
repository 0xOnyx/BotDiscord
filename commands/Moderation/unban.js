
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  let user = await client.users.fetch(args[0]);

  if (settings.langue === 'fr') {
  if (!user) return message.reply("l'utilisateur n'existe pas.");
  message.guild.members.unban(user);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
    .setColor("#35f092")
    .setDescription(`**Action**: unban`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);

  } if (settings.langue === 'en') {
    if (!user) return message.reply("The user does not exist.");
    message.guild.members.unban(user);
  
    const embed = new MessageEmbed()
      .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
      .setColor("#35f092")
      .setDescription(`**Action**: unban`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
      
      if(!settings.logChannel || settings.logChannel === 'none') return;
    client.channels.cache.get(settings.logChannel).send(embed);
  }
};

module.exports.help = {
  name: "unban",
  aliases: ['unban'],
  category: 'moderation',
  description: "Unban un utilisateur",
  cooldown: 5,
  usage: '<user_id>',
  isUserAdmin: false,
  permissions: true,
  args: true
};