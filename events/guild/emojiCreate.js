const { MessageEmbed } = require('discord.js');

module.exports = async (client, emoji) => {
let settings = await client.getGuild(emoji.guild);
if(!settings.logChannel || settings.logChannel === 'none') return;
// let settings;
// try {
// settings = await bot.getGuild(emoji.guild);
// } catch (e) {
// console.log(e);
// }

const embed = new MessageEmbed()
.setColor(3066993)
.setTitle(`📝 Emojis updated !`)
.addField(`Emoji created`, `${emoji} :${emoji.name}:`)
.setFooter(`Emoji ID: ${emoji.id}`)
.setTimestamp();

const logC = emoji.guild.channels.cache.find(channel => channel.id == settings.logChannel);
if (logC) logC.send(embed);

// ! SYSTEME D'ENVOIE DE MESSAGES A TESTER ET SI CA MARCHE METTRE SUR TOUS LES AUTRES LOGS

// ! ET TESTER LE SYSTEME DE RECUPERATION DE LA GUILD DANS LA DB
};