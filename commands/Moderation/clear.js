
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  if (settings.langue === 'fr') {
    message.delete();
    try {
if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply('Il faut spécifier un ***nombre*** entre 1 et 100!');

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  await message.channel.bulkDelete(messages);
    } catch {
      message.channel.send(`Vous ne pouvez pas supprimer les messages de plus de 14 jours !`)
    }
  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: clear\n**Nombre de messages**: ${args[0]}\n**Salon**: ${message.channel}`)
    
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);

} if (settings.langue === 'en') {
  message.delete();
  try {
  if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply('You must specify a ***number*** between 1 and 100!');

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  await message.channel.bulkDelete(messages);
} catch {
  message.channel.send(`Vous ne pouvez pas supprimer les messages de plus de 14 jours !`)
}
  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: clear\n**Number of messages**: ${args[0]}\n**Channel**: ${message.channel}`)
    
    if(!settings.logChannel || settings.logChannel === 'none') return;
  client.channels.cache.get(settings.logChannel).send(embed);
}
};

module.exports.help = {
  name: "clear",
  aliases: ['clear'],
  category: 'moderation',
  description: "Clear un nombre de message spécifié",
  cooldown: 3,
  usage: '<nbr_messages>',
  isUserAdmin: false,
  permissions: true,
  args: true
};