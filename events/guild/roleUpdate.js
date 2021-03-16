const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, oldRole, newRole) => {
    const settings = await client.getGuild(oldRole.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;
    if(oldRole.rawPosition !== newRole.rawPosition) return;

    const arrN = newRole.permissions.toArray();
    const arrO = oldRole.permissions.toArray();
    let permA = arrN.filter(x => !arrO.includes(x));
    let permR = arrO.filter(x => !arrN.includes(x));
    const permAddedString = permA.join(',\n');
    const permRemovedString = permR.join(',\n');

    // role name change
    const embed = new MessageEmbed()
    .setDescription(`**Role ${newRole} changed**`)
    .setColor(15105570)
    .setFooter(`Role ID: ${newRole.id}`)
    .setTimestamp();

    // role colour change
		if (oldRole.color != newRole.color) {
            embed.addField('Color', `[${oldRole.hexColor}](https://www.color-hex.com/color/${oldRole.hexColor.slice(1)}) **->** [${newRole.hexColor}](https://www.color-hex.com/color/${newRole.hexColor.slice(1)})`)
        }
		if (oldRole.name != newRole.name) {
			embed.addField('Name', `${oldRole.name} **->** ${newRole.name}`)
        }
        if (oldRole.mentionable != newRole.mentionable) {
            embed.addField('Mentionable', `${oldRole.mentionable ? 'Yes' : 'No'} **->** ${newRole.mentionable ? 'Yes' : 'No'}`)
        }
		if (oldRole.hoist != newRole.hoist) {
			embed.addField('Separate role', `${oldRole.hoist ? 'Yes' : 'No'} **->** ${newRole.hoist ? 'Yes' : 'No'}`)
        }
        if (permAddedString) {
            embed.addField(`✅ Added permissions`, `${permAddedString}`)
        }
        if (permRemovedString) {
            embed.addField(`❌ Removed permissions`, `${permRemovedString}`)
        }
            client.channels.cache.get(settings.logChannel).send(embed);
}