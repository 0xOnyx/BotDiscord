const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild, user) => {
const settings = await client.getGuild(guild);
if(!settings.logChannel || settings.logChannel === 'none') return;

const embed = new MessageEmbed()
.setAuthor('User banned')
.setThumbnail(`${user.displayAvatarURL()}`)
.setDescription(`${user.toString()}\n${user.tag}`)
.setFooter(`User ID: ${user.id}`)
.setTimestamp();

client.channels.cache.get(settings.logChannel).send(embed);
};