module.exports.run = (client, message, args, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  if(!message.member.hasPermission("MENTION_EVERYONE") && message.content.includes(`@`)){
    message.reply("Vous ne pouvez pas mentionner avec la commande say !")
  } else if (message.content.includes('https://') || message.content.includes('http://') || message.content.includes('www.') || message.content.includes('discord.gg')) {
    message.reply('Vous ne pouvez pas inclure de lien avec la commande say')
    } else {
      message.channel.send(args.join(" "));
      }
    } if (settings.langue === 'en') {
      if(!message.member.hasPermission("MENTION_EVERYONE") && message.content.includes(`@`)){
        message.reply("You cannot mention with say command !")
      } else if (message.content.includes('https://') || message.content.includes('http://') || message.content.includes('www.') || message.content.includes('discord.gg')) {
        message.reply('You cannot include a link with the say command')
        } else {
          message.channel.send(args.join(" "));
          }
    }
};

module.exports.help = {
  name: "say",
  aliases: ['say', 'repeat', 'rep'],
  category: 'jeu',
  description: "Répéte le message d'un utilisateur",
  cooldown: 1,
  usage: '<votre_message>',
  isUserAdmin: false,
  permissions: false,
  args: true
};