module.exports.run = (client, message, args, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  const user = message.guild.member(message.mentions.users.first());
  const expToRemove = parseInt(args[1]);
  if (isNaN(expToRemove)) return message.reply("Il faut entrer un nombre !");
  client.removeExp(client, user, expToRemove);
  message.channel.send(`Vous avez enlevé avec succès ${expToRemove} points d'expérience à ${user}!`);
  } if (settings.langue === 'en') { 
    const user = message.guild.member(message.mentions.users.first());
    const expToRemove = parseInt(args[1]);
    if (isNaN(expToRemove)) return message.reply("You must enter a number !");
    client.removeExp(client, user, expToRemove);
    message.channel.send(`You have successfully removed ${expToRemove} experience points from ${user}!`);
  }
};

module.exports.help = {
  name: "removeexperience",
  aliases: ['removeexperience', 'remexp'],
  category: 'experience',
  description: "Enlever de l'expérience à l'utilisateur",
  cooldown: 10,
  usage: '<@user> <exp_to_remove>',
  isUserAdmin: false,
  permissions: true,
  args: true
};