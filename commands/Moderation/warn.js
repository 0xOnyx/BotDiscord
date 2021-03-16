const { Util, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  const user = message.guild.member(message.mentions.users.first());
  const utilisateur = message.mentions.users.first();
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Vous n'avez pas la permission d'avertir des gens. La permission necessaire est \`EXPULSER DES MEMBRE\``)
  const member = client.getUsers(user);
  if (member.userID == message.author.id) return message.channel.send(`Vous ne pouvez pas vous avertir vous même.`)
  if (user.hasPermission('ADMINISTRATOR')) return message.channel.send(`Vous ne pouvez pas avertir quelqu'un qui a la permission administrateur`)

  const wReason = (args.join(' ')) ? args.splice(1).join(' ') : message.channel.send(`Pas de raison donné`);

  try {
    await require('../../helper/warning-system').run(client, message, member, utilisateur,  wReason, settings);
} catch (err) {
    console.log(err);
    // if (bot.config.debug) bot.logger.error(`${err.message} - command: warn.`);
    message.channel.send(`Il y a eu une erreur lors de l'avertissement de l'utilisateur`).then(m => m.delete({ timeout: 5000 }));
}
}
// ! mettre le @du mod et le tag 
module.exports.help = {
    name: "warn",
    aliases: ['warn', 'warns'],
    category: 'moderation',
    description: "Warn an user",
    cooldown: 3,
    usage: '<@user> <reason>',
    isUserAdmin: true,
    permissions: true,
    args: true
  };