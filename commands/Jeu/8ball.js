const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
  message.delete();
  if (settings.langue === 'fr') {
  const replies = ["Oui", "Non", "Peut-être", "Je ne sais pas", "Jamais"];
  const question = args.join(" ");
  const response = Math.floor(Math.random() * replies.length);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("#cb4e41")
    .setThumbnail("https://cdn.discordapp.com/attachments/705029954844360715/720585881420955658/ball-pool-png-8-ball-pool-png-photos-512.png")
    .addField(question, replies[response]);

  message.channel.send(embed);
  } if (settings.langue === 'en') {
    const replies = ["Yes", "No", "Perhaps",  "I don't know"];
    const question = args.join(" ");
    const response = Math.floor(Math.random() * replies.length);
  
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor("#cb4e41")
      .setThumbnail("https://cdn.discordapp.com/attachments/705029954844360715/720585881420955658/ball-pool-png-8-ball-pool-png-photos-512.png")
      .addField(question, replies[response]);
  
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "8ball",
  aliases: ['8ball', 'question'],
  category: 'jeu',
  description: "Renvoie une réponse à une question!",
  cooldown: 4,
  usage: '<question>',
  isUserAdmin: false,
  permissions: false,
  args: true
};