const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
  let muteTime = (args[1] || '24h');

  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: 'muted',
        color: '#000000',
        position: 1,
        permissions: []
      }
    });

    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      });
    });
  };

  if (settings.langue === 'fr') {
  await user.roles.add(muteRole.id);
  message.channel.send(`<@${user.id}> est muté pour ${ms(ms(muteTime))}. Merci de mettre le role muted le plus haut possible **juste en dessous du bot** et de ne pas changer le nom du role.`)

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: mute\n**Temps**: ${ms(ms(muteTime))}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  if(!settings.logChannel || settings.logChannel === 'none') {

  } else {
  client.channels.cache.get(settings.logChannel).send(embed);
  }

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));

} if (settings.langue === 'en') {
  await user.roles.add(muteRole.id);
  message.channel.send(`<@${user.id}> is muted for ${ms(ms(muteTime))}. Please put the muted role as high as possible ** just below the bot ** and don't change the role name.`)

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`, user.user.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: mute\n**Time**: ${ms(ms(muteTime))}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  if(!settings.logChannel || settings.logChannel === 'none') {

  } else {
  client.channels.cache.get(settings.logChannel).send(embed);
  }

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));
}
};

module.exports.help = {
  name: "mute",
  aliases: ['mute'],
  category: 'moderation',
  description: "Mute un utilisateur sur le serveur",
  cooldown: 3,
  usage: '<@user> <time>',
  isUserAdmin: true,
  permissions: true,
  args: true
};