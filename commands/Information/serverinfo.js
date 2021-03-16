const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args, settings) => {
    message.delete();
    const guild = message.guild;
    const dnd = guild.members.cache.filter(m => m.user.presence.status === 'dnd').size
    const online = guild.members.cache.filter(m => m.user.presence.status === 'online').size
    const idle = guild.members.cache.filter(m => m.user.presence.status === 'idle').size
    const offline = guild.members.cache.filter(m => m.user.presence.status === 'offline').size
    const chan = guild.channels.cache.size - guild.channels.cache.filter(ch => ch.type === 'category').size

    if (settings.langue === 'fr') {
      const embed = new MessageEmbed()
    .setColor('#ffffff')
    .setAuthor(`${guild.name}`, guild.iconURL())
    .setThumbnail(guild.iconURL())
    .setDescription(`**Owner:** ${guild.owner} \`(${guild.owner.user.tag})\`
    **ID:** \`${guild.id}\`
    **Creer le:** \`${moment.utc(guild.createdAt).format('DD/MM/YYYY hh:mm')}\`
    **Membres:** \`🌐: ${guild.members.cache.size} - 👤: ${message.guild.members.cache.filter(member => !member.user.bot).size} - 🤖: ${guild.members.cache.filter(m => m.user.bot).size}\`
    **Channels:** \`Channels: ${chan} - textuel: ${guild.channels.cache.filter(ch => ch.type === 'text').size} - vocal: ${guild.channels.cache.filter(ch => ch.type === 'voice').size}\`
    **Rôles:** \`${guild.roles.cache.size}\`
    **Emojis:** \`${guild.emojis.cache.size}\`
    **Level de verification:** \`${message.guild.verificationLevel}\`
    **Boosts:** \`${message.guild.premiumSubscriptionCount}\`
    **Region:** \`${guild.region}\`
    **Salon AFK:** ${guild.afkChannel ? ` \`${guild.afkChannel.name}\`` : ':x:'}
    **Presences:**
    <:online:778339798791880705> : \`${online}\`
    <:dnd:778339840831520798> : \`${dnd}\`
    <:idle:778339774095294504> : \`${idle}\`
    <:invisible:778339820728221738> : \`${offline}\`
    `)
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`)
    .setTimestamp();

    message.channel.send(embed);
    } if (settings.langue === 'en') {
      const embed = new MessageEmbed()
      .setColor('#ffffff')
      .setAuthor(`${guild.name}`, guild.iconURL())
      .setThumbnail(guild.iconURL())
      .setDescription(`**Owner:** ${guild.owner} \`(${guild.owner.user.tag})\`
      **ID:** \`${guild.id}\`
      **Created at:** \`${moment.utc(guild.createdAt).format('MM/DD/YYYY hh:mm')}\`
      **Members:** \`🌐: ${guild.members.cache.size} - 👤: ${message.guild.members.cache.filter(member => !member.user.bot).size} - 🤖: ${guild.members.cache.filter(m => m.user.bot).size}\`
      **Channels:** \`Channels: ${chan} - textual: ${guild.channels.cache.filter(ch => ch.type === 'text').size} - vocal: ${guild.channels.cache.filter(ch => ch.type === 'voice').size}\`
      **Roles:** \`${guild.roles.cache.size}\`
      **Emojis:** \`${guild.emojis.cache.size}\`
      **Verification level:** \`${message.guild.verificationLevel}\`
      **Boosts:** \`${message.guild.premiumSubscriptionCount}\`
      **Region:** \`${guild.region}\`
      **AFK channel:** ${guild.afkChannel ? ` \`${guild.afkChannel.name}\`` : ':x:'}
      **Presences:**
      <:online:778339798791880705> : \`${online}\`
      <:dnd:778339840831520798> : \`${dnd}\`
      <:idle:778339774095294504> : \`${idle}\`
      <:invisible:778339820728221738> : \`${offline}\`
      `)
      .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`)
      .setTimestamp();
  
      message.channel.send(embed);
    }
};

module.exports.help = {
  name: "serverinfo",
  aliases: ['serverinfo', 'si', 'serveurinfo'],
  category: 'information',
  description: "Renvoie des informations concernant le serveur!",
  cooldown: 4,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};