module.exports.run = async (client, message, args, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas la permission !")
  if(!args[0]) return message.channel.send("Veuillez entrer l'identifiant du message du giveaways.")
  let messageID = args[0];
  client.giveawaysManager.delete(messageID).then(() => {
    message.channel.send("Giveaway supprimé !");
  }).catch((err) => {
    message.channel.send("Aucun giveaway n'existe avec l'identifiant " + messageID);
  });
} if (settings.langue === 'en') {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You don't have permission!")
  if(!args[0]) return message.channel.send("Please enter the giveaways message id.")
  let messageID = args[0];
  client.giveawaysManager.delete(messageID).then(() => {
    message.channel.send("Giveaway delete !");
  }).catch((err) => {
    message.channel.send("No giveaway exists with the identifier " + messageID);
  });
}
}

module.exports.help = {
    name: "gdelete",
    aliases: ['gdelete'],
    category: 'giveaway',
    description: "Supprime le giveaway",
    cooldown: 3,
    usage: '<message_ID>',
    isUserAdmin: false,
    permissions: false,
    args: false
  };