const { MessageEmbed } = require("discord.js");
const { dependencies } = require("../../package.json")
const os = require('os');

module.exports.run = (client, message, args, settings) => {
  message.delete();
    let usedMemory = os.totalmem() -os.freemem()
    let totalMemory = os.totalmem();
    let  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'
    usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
    totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);
  //     { name: "Arche", value: `${os.arch()}`, inline: true },
  // **serveur:** \`${client.shard.client.guilds.cache.size.toString()}\`
 console.log(client.shard[0])
  if (settings.langue === 'fr') {
    const embed = new MessageEmbed()
    .setColor('#ffffff')
    .setAuthor(`${client.user.tag}`, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setDescription(`**OS:** \`${os.type()}\`
    **Memoire:** \`${usedMemory} Go / ${totalMemory} Go (${getpercentage})\`
    **Uptime:** \`${(Math.round(client.uptime / (1000 * 60 * 60 * 24)) % 30) + " Jours, " + (Math.round(client.uptime / (1000 * 60 * 60))) + " heures, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes et " + (Math.round(client.uptime / 1000) % 60) + " secondes"}\`
    **Serveurs:** \`${client.guilds.cache.size.toString()}\`
    **Salons:** \`${client.channels.cache.size.toString()}\`
    **Utilisateurs:** \`${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}\`
    **Shards:** \`${client.shard.count}\`
    **Version:** <:DJS:730882357665595392> \`Discord.js\ ${dependencies["discord.js"]}\`
    **NodeJS:** <:nodeJS:730882513106632856> \`${process.version}\`
    **Language:** <:logojs:730384034009579551> \`Javascript\`
    **Site internet:** https://yzzy-bot.github.io
    **Inviter le bot:** [Invitation du bot](https://discord.com/api/oauth2/authorize?client_id=719881185064386644&permissions=8&scope=bot)
    **Support:** [Invitation du serveur](https://discord.gg/aasK88k)
    `)
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`)
    .setTimestamp();

    message.channel.send(embed);
  } if (settings.langue === 'en') {
    const embed = new MessageEmbed()
    .setColor('#ffffff')
    .setAuthor(`${client.user.tag}`, client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setDescription(`**OS:** \`${os.type()}\`
    **Memory:** \`${usedMemory} Go / ${totalMemory} Go (${getpercentage})\`
    **Uptime:** \`${(Math.round(client.uptime / (1000 * 60 * 60 * 24)) % 30) + " Day, " + (Math.round(client.uptime / (1000 * 60 * 60))) + " hour, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes and " + (Math.round(client.uptime / 1000) % 60) + " seconds"}\`
    **Server:** \`${client.guilds.cache.size.toString()}\`
    **Salons:** \`${client.channels.cache.size.toString()}\`
    **User:** \`${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}\`
    **Shards:** \`${client.shard.count}\`
    **Version:** <:DJS:730882357665595392> \`Discord.js\ ${dependencies["discord.js"]}\`
    **NodeJS:** <:nodeJS:730882513106632856> \`${process.version}\`
    **Language:** <:logojs:730384034009579551> \`Javascript\`
    **Website:** https://yzzy-bot.github.io
    **Invite bot:** [Bot invite](https://discord.com/api/oauth2/authorize?client_id=719881185064386644&permissions=8&scope=bot)
    **Support:** [Server Invite](https://discord.gg/aasK88k)
    `)
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`)
    .setTimestamp();

    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "botinfo",
  aliases: ['botinfo', 'bi'],
  category: 'information',
  description: "Renvoie des informations concernant le bot!",
  cooldown: 4,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};