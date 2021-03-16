const { MessageEmbed } = require('discord.js');
module.exports = async (client, emoji) => {
    let settings = await client.getGuild(emoji.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;
    // let settings;
// try {
// settings = await client.getGuild(emoji.guild);
// } catch (e) {
// console.log(e);
// }

const embed = new MessageEmbed()
.setColor(15158332)
.setTitle(`📝 Emojis updated !`)
.addField(`Emoji deleted`, `[:${emoji.name}:](${emoji.url})`)
.setFooter(`Emoji ID: ${emoji.id}`)
.setTimestamp();

client.channels.cache.get(settings.logChannel).send(embed);
};