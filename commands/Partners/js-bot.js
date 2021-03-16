const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
  message.delete();

message.channel.send("> **`[ Bots Discord en javascript ]`**\n ```md\n# Une vraie aide pour coder vos bots.\n* Des codes simples tout fait à votre dispositions.\n* On teste et ajoute vos bots.\n* Un partage de différentes fonctions des membres.\n* Un git de tutoriels.\n```\n\> https://discord.gg/3p7Kcy2zUT")

if (settings.langue === 'fr') {
    const embed = new MessageEmbed()
    .setTitle("Partenariat avec \`Javascript BOT\`")
    .setDescription("Si vous êtes intéressé, voici le lien : [Invitation](https://discord.gg/3p7Kcy2zUT)")
    .setFooter('Partenariat avec YZZY ? Viens dans le serveur support et mp LACOSTAR91#3705')
    .setTimestamp();
    
    message.channel.send(embed)
    } if (settings.langue === 'en') {
      const embed = new MessageEmbed()
      .setTitle("Partnership with \`Javascript BOT\`")
      .setDescription("If you are interested, here is the link: [Invite](https://discord.gg/3p7Kcy2zUT)")
      .setFooter('Partnership with YZZY? Come to the support server and dm LACOSTAR91#3705')
      .setTimestamp();
      
      message.channel.send(embed)
    }
}

module.exports.help = {
    name: "js-bot",
    aliases: ['js-bot', 'javascript-bot', 'Js-bot'],
    category: 'partners',
    description: "Partenariat avec \`Javascript BOT\`",
    cooldown: 5,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };