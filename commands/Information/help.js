const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');


module.exports.run = async (client, message, args, settings) => {
  message.delete();

  if (!args.length) {
    if (settings.langue === 'fr') {
      const quest = new MessageEmbed()
  .setDescription("📩 - En mp\n📑 - Sur le channel\n❌ - Annuler")
  .setTimestamp();

    const embed = new MessageEmbed()
      .setColor("#36393F")
      .addField("Liste des commandes", `Mon prefix ici est \`${settings.prefix}\`\nAu total je comptabilise \`${client.commands.size}\` commandes\nPour plus d'informations sur une commande, tapez \`${settings.prefix}help <command_name>\`.`)
      .setFooter(`${message.author.tag}`, message.author.avatarURL())

    for (const category of categoryList) {
      embed.addField(
        `${category} - ${client.commands.filter(cat => cat.help.category === category.toLowerCase()).size}\n`,
        `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`,
      )
    };
    embed.addField(`🔗 **Liens du bot**`, `[Invitation du bot](https://discord.com/api/oauth2/authorize?client_id=719881185064386644&permissions=8&scope=bot) | [Invitation du serveur](https://discord.gg/aasK88k) | [Site internet](https://yzzy-bot.github.io)`, false)

    const go = await message.channel.send(quest);
    await go.react('📩');
    await go.react('📑');
    await go.react('❌');

    const erro = new MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Error')
    .setDescription("La liste des commande n'a pas pu vous etre envoyer pour l'une des raison suivantes\n\t- Vous avez desactiver la fonction message priver sur ce serveur ou globalement\n\t- Vous avez bloquer le bot")
    .setTimestamp();

    let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
    let reaction = (await go.awaitReactions(reactionFilter, { max: 1 })).first()
    // , time: 5000, errors: ["time"]
    // .catch(err => {
    //   go.delete();
    //   message.channel.send('Vous avez pris trop de temps repondre avec les reactions !').then(m => m.delete({ timeout: 5000,}));
    // });
    if (reaction.emoji.name === '📩') {
      go.delete();
      message.author.send(embed).catch(err => {
        message.channel.send(erro)
      })
    } else if (reaction.emoji.name === '📑') {
      go.delete();
      message.channel.send(embed);
    } else if (reaction.emoji.name === '❌') {
      go.delete();
      message.channel.send('Commande annuler !').then(m => m.delete({ timeout: 5000,}));
    }




  } else if (settings.langue === 'en') {
    const quest = new MessageEmbed()
  .setDescription("📩 - On dm\n📑 - On the channel\n❌ - Cancel")
  .setTimestamp();

    const embed = new MessageEmbed()
      .setColor("#36393F")
      .addField("List of commands", `My prefix here is \`${settings.prefix}\`\nIn total I count \`${client.commands.size}\` commands\nFor more information about an order, type \`${settings.prefix}help <command_name>\`.`)
      .setFooter(`${message.author.tag}`, message.author.avatarURL())

    for (const category of categoryList) {
      embed.addField(
        `${category} - ${client.commands.filter(cat => cat.help.category === category.toLowerCase()).size}\n`,
        `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`,
      )
    };
    embed.addField(`🔗 **Bot links**`, `[Bot invite](https://discord.com/api/oauth2/authorize?client_id=719881185064386644&permissions=8&scope=bot) | [Server Invite](https://discord.gg/aasK88k) | [Website](https://yzzy-bot.github.io)`, false)

    const go = await message.channel.send(quest);
    await go.react('📩');
    await go.react('📑');
    await go.react('❌');

    const erro = new MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Error')
    .setDescription("The order list could not be sent to you for one of the following reasons\n\t- You have deactivated the private message function on this server or globally\n\t- You have blocked the bot")
    .setTimestamp();

    let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
    let reaction = (await go.awaitReactions(reactionFilter, { max: 1 })).first()

    if (reaction.emoji.name === '📩') {
      go.delete();
      message.author.send(embed).catch(err => {
        message.channel.send(erro)
      })
    } else if (reaction.emoji.name === '📑') {
      go.delete();
      message.channel.send(embed);
    } else if (reaction.emoji.name === '❌') {
      go.delete();
      message.channel.send('Command canceled!').then(m => m.delete({ timeout: 5000,}));
    }
  }



  } else {
    if (settings.langue === 'fr') {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!command) return message.reply("cette commande n'existe pas!");

    const embed = new MessageEmbed()
      .setColor("#36393F")
      .setTitle(`\`${command.help.name}\``)
      .setDescription(`**Description:** ${command.help.description}
      **Cooldown:** ${command.help.cooldown} secondes
      **Utilisation:** ${command.help.usage ? `${settings.prefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`}
      **Permission requise:** ${command.help.permissions ? "<:check:730881798866993283>" : "<:no_check:730881778281218159>"}
      **Arguments:** ${command.help.args ? "<:check:730881798866993283>" : "<:no_check:730881778281218159>"}
      **Alias:** \`${command.help.aliases.join(', ')}\`
      `)
      .setFooter(`${message.author.tag}`, message.author.avatarURL())

    // if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
    return message.channel.send(embed);// .then(m => m.delete({ timeout: 300,})); // 3 secondes




    
  } else if (settings.langue === 'en') {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!command) return message.reply("cette commande n'existe pas!");

    const embed = new MessageEmbed()
      .setColor("#36393F")
      .setTitle(`\`${command.help.name}\``)
      .setDescription(`**Description:** ${command.help.description}
      **Cooldown:** ${command.help.cooldown} seconds
      **Use:** ${command.help.usage ? `${settings.prefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`}
      **Permission required:** ${command.help.permissions ? "<:check:730881798866993283>" : "<:no_check:730881778281218159>"}
      **Arguments:** ${command.help.args ? "<:check:730881798866993283>" : "<:no_check:730881778281218159>"}
      **Aliases:** \`${command.help.aliases.join(', ')}\`
      `)
      .setFooter(`${message.author.tag}`, message.author.avatarURL())

    return message.channel.send(embed);
  }
}
};

module.exports.help = {
  name: "help",
  aliases: ['help', 'h', 'aide'],
  category: 'information',
  description: "Renvoie une liste de commandes ou les informations sur une seule commande!",
  cooldown: 3,
  usage: '<command_name>',
  isUserAdmin: false,
  permissions: false,
  args: false
};




// const { MessageEmbed } = require("discord.js");
// const { readdirSync } = require("fs");
// const categoryList = readdirSync('./commands');


// module.exports.run = (client, message, args, settings) => {
//   const embederror = new MessageEmbed()
//     .setColor('#FF0000')
//     .setTitle("L'envoie de la liste des commandes a échouer")
//     .setDescription

//   if (!args.length) {
//     const embed = new MessageEmbed()
//       .setColor("#36393F")
//       .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${settings.prefix}help <command_name>\`.`)
//       .setFooter(`Pour inviter YZZY faite ${settings.prefix}botinfo`)

//     for (const category of categoryList) {
//       embed.addField(
//         `${category}\n`,
//         `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
//       );
//     };

//     return message.channel.send(embed);
//   } else {
//     const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
//     if (!command) return message.reply("cette commande n'existe pas!");

//     const embed = new MessageEmbed()
//       .setColor("#36393F")
//       .setTitle(`\`${command.help.name}\``)
//       .addField("Description", `${command.help.description} (cd: ${command.help.cooldown}secs)`)
//       .addField("Utilisation", command.help.usage ? `${settings.prefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`, true)
//       .setFooter(`Cooldown: ${command.help.cooldown} secondes | Permission: ${command.help.permissions ? "Admin uniquement" : "Tout le monde peut utiliser"}`)

//     if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
//     return message.channel.send(embed);// .then(m => m.delete({ timeout: 300,})); // 3 secondes
//   }
// };
// //.catch(err => message.channel.send(''))
// module.exports.help = {
//   name: "help",
//   aliases: ['help'],
//   category: 'information',
//   description: "Renvoie une liste de commandes ou les informations sur une seule commande!",
//   cooldown: 3,
//   usage: '<command_name>',
//   isUserAdmin: false,
//   permissions: false,
//   args: false
// };