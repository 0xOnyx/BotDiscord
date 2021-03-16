module.exports.run = (client, message, args, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  const user = message.guild.member(message.mentions.users.first());
  const expToAdd = parseInt(args[1]);
  if (isNaN(expToAdd)) return message.reply("Il faut entrer un nombre !");
  client.addExp(client, user, expToAdd);
  message.channel.send(`Vous avez ajouté avec succès ${expToAdd} points d'expérience à ${user}!`);
  } if (settings.langue === 'en') {
    const user = message.guild.member(message.mentions.users.first());
    const expToAdd = parseInt(args[1]);
    if (isNaN(expToAdd)) return message.reply("You must enter a number !");
    client.addExp(client, user, expToAdd);
    message.channel.send(`You have successfully added ${expToAdd} experience points to ${user}!`);
  }
};

module.exports.help = {
  name: "addexperience",
  aliases: ['addexperience', 'addexp'],
  category: 'experience',
  description: "Ajouter de l'expérience à l'utilisateur",
  cooldown: 10,
  usage: '<@user> <exp_to_add>',
  isUserAdmin: false,
  permissions: true,
  args: true
};