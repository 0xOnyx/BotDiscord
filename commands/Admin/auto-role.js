const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  // const args_total = args.splice(0).join(" ");
  // const args_default = args_total.split(" ");
  // const str_channel = args_default[2].match(/[0-9]/g).join("")
  // const str_emoji = args_default[1]
  // const str_role = args_default[0].match(/[0-9]/g).join("")

  // const role_id = args_default[0];
  // const emoji_id = args_default[1];
  // const channel_id = args_default[2].match(/[0-9]/g).join("");


  // const emoji = args[1];
  // const channel = message.mentions.channels.first();
  // const role = message.mentions.roles.first();

  if (message.author.id === '507329636305207308') {

  // if (args[1].match(/[0-9]/g)) {
  // const emojiID = args[1].match(/[0-9]/g).join("");
  // const channelID = channel.id;
  // const roleID = role.id;

  // const embed = new MessageEmbed()
  // .setTitle('📌 Rôle 📌')
  // .setColor("#00FF2E")
  // .addField(
  //     "__***Rôle disponible :***__",
  //     `
  //     > ${emoji}** --> <@&${roleID.toString()}>**
  //     `
  // )
  // .setTimestamp();
  // const channel_role = client.channels.cache.get(channelID); //Récupère le channel log

  //   await client.createRole({
  //     guildName: message.guild.name,
  //     guildID: message.guild.id,
  //     idRole: roleID,
  //     idChannel: channelID,
  //     idEmoji: emojiID,
  //     emoji: emoji
  //   })

  // channel_role.send(embed).then(async msg =>{
  //   await msg.react(emojiID);
  // });
  // } else {
  //   const emojiID = args[1];
  //   const channelID = channel.id;
  // const roleID = role.id;

  // const embed = new MessageEmbed()
  // .setTitle('📌 Rôle 📌')
  // .setColor("#00FF2E")
  // .addField(
  //     "__***Rôle disponible :***__",
  //     `
  //     > ${emoji}** --> <@&${roleID.toString()}>**
  //     `
  // )
  // .setTimestamp();
  // const channel_role = client.channels.cache.get(channelID); //Récupère le channel log

  //   await client.createRole({
  //     guildName: message.guild.name,
  //     guildID: message.guild.id,
  //     idRole: roleID,
  //     idChannel: channelID,
  //     idEmoji: emojiID,
  //     emoji: emoji
  //   })

  // channel_role.send(embed).then(async msg =>{
  //   console.log(emojiID)
  //   await msg.react(emojiID);
  // });
  // }
  }else {
    message.channel.send(`Commande en cours de maintenance. Veuillez nous escuser de la gene ocasionner`)
  }



  // message.delete();

  // const channel = message.mentions.channels.first();
  // const role = message.mentions.roles.first();
  // const channelID = channel.id;
  // const roleID = role.id

  // const Role = message.guild.roles.cache.get(roleID);
  // const checkEmoji = message.guild.emojis.cache.get("730881798866993283");

  // const embed = new MessageEmbed()
  //   .setTitle("Rôles")
  //   .setDescription("Cliquez sur la reaction pour obtenir le role et acceder au reste du serveur")
  //   .setColor("#dc143c")
  //   .addField("Les roles disponibles",
  //     `${checkEmoji} - ${Role}`
  //     )
  //   .setFooter("YZZY bot | Creator: LACOSTAR91#3705");

  //   if (message.author.id === '507329636305207308') {
  //   client.channels.cache.get(channelID).send(embed).then(async msg => {
  //     await msg.react(checkEmoji);
  //   })}else {
  //   message.channel.send(`Commande en cours d'amelioration. Veuillez nous escuser de la gene ocasionner`)
  //   }
};

module.exports.help = {
    name: "auto-role",
    aliases: ['auto-role', 'auto-roles'],
    category: 'admin',
    description: "Pour faire un systeme d'auto-role!",
    cooldown: 3,
    usage: '<role> <emoji> <channel>',
    permissions: true,
    isUserAdmin: false,
    args: true
  };