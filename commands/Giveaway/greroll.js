// module.exports.run = (client, message, args) => {
//   // If the member doesn't have enough permissions
//   if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
//     return message.channel.send(':x: You need to have the manage messages permissions to reroll giveaways or a role with the name is Giveaways.');
// }

// // If no message ID or giveaway name is specified
// if(!args[0]){
//   return message.channel.send(':x: You have to specify a valid message ID!');
// }

// // try to found the giveaway with prize then with ID
// let giveaway = 
// // Search with giveaway prize
// client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
// // Search with giveaway ID
// client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

// // If no giveaway was found
// if(!giveaway){
//   return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
// }

// // Reroll the giveaway
// client.giveawaysManager.reroll(giveaway.messageID)
// .then(() => {
//   // Success message
//   message.channel.send('Giveaway rerolled!');
// })
// .catch((e) => {
//   if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
//       message.channel.send('This giveaway is not ended!');
//   } else {
//       console.error(e);
//       message.channel.send('An error occured...');
//   }
// });
// };


const Discord = require('discord.js');
// const path = require('path');

module.exports.run = async (client, message, args, settings) => {
  message.delete();
    
    let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');
    let hasRole = message.member.roles.cache.find(r => r.name === 'Giveaways');

    if (settings.langue === 'fr') {

      if(hasPerm === false || !hasRole == null) return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('__ERREUR__')
          .setColor('RED')
          .setDescrtiption('Il vous faut la permission `MANAGE_MESSAGES` ou un rôle nommé `giveaways` pour faire cette commande.')
          .setTimestamp()
      )

      if(!args[0]) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle('__ERREUR__')
            .setColor('RED')
            .setDescription('Veuillez entrer l\'ID du giveaway.')
            .setTimestamp()
        )
      }

      client.giveawaysManager.reroll(args[0], {
        messages: {
          congrat: "\`🎁\`・Bien joué au nouveau gagnant: {winners}",
        }
      })
    } if (settings.langue === 'en') {
      if(hasPerm === false || !hasRole == null) return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('__ERREUR__')
          .setColor('RED')
          .setDescription('You need `MANAGE_MESSAGES` permissions or a role named ``giveaway`` to use that command.')
          .setTimestamp()
      )

      if(!args[0]) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle('__ERROR__')
            .setColor('RED')
            .setDescription('Please, enter the giveaway ID')
            .setTimestamp()
        )
      }

      client.giveawaysManager.reroll(args[0], {
        messages: {
          congrat: "\`🎁\`・Congratulations: {winners}",
        }
      })
    }
      
}

module.exports.help = {
    name: "greroll",
    aliases: ['greroll'],
    category: 'giveaway',
    description: "Reroll un giveaway",
    cooldown: 3,
    usage: '<message_ID>',
    isUserAdmin: false,
    permissions: false,
    args: false
  };