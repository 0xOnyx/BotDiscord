
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  let user = message.guild.member(message.mentions.users.first());

  if (settings.langue === 'fr') {
  if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply('il faut spécifier un ***nombre*** entre 1 et 100!');

  const messages = (await message.channel.messages.fetch({
    limit: 100,
    before: message.id,
  })).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user) return message.reply('aucun message à supprimer sur cet utilisateur (ou cet utilisateur n\'existe pas).');

  if (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: prune\n**Nombre de messages**: ${args[1]}\n**Utilisateur**: ${args[0]}`)
    
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);

} if (settings.langue === 'en') {
  if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply('you must specify a ***number*** between 1 and 100!');

  const messages = (await message.channel.messages.fetch({
    limit: 100,
    before: message.id,
  })).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user) return message.reply('no message to delete on this user (or this user does not exist).');

  if (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: prune\n**Number of messages**: ${args[1]}\n**User**: ${args[0]}`)
    
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);
}
};

module.exports.help = {
  name: "prune",
  aliases: ['prune'],
  category: 'moderation',
  description: "Purge un nombre de message spécifié sur un utilisateur spécifié",
  cooldown: 5,
  usage: '<@user> <nbr_messages>',
  isUserAdmin: true,
  permissions: true,
  args: true
};