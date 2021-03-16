const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
  if(message.deletable) {
    message.delete();
  }
  if (settings.langue === 'fr') {
  message.channel.send("La commande unlock a été fusionner avec la commande lock faite \`%help lock\` pour plus d'infos");
  } if (settings.langue === 'en') {
    message.channel.send("The unlock command has fusionned wih the lock command do \`%help lock\` for more information");
  }
};

module.exports.help = {
  name: "unlock",
  aliases: ['unlock'],
  category: 'moderation',
  description: "Lock un channel",
  cooldown: 3,
  usage: '<@role | roleID> <true | false | null>',
  isUserAdmin: false,
  permissions: true,
  args: true
};