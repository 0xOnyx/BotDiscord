const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, oldChannel, newChannel) => {
	if (newChannel.type == 'dm') return;
    const settings = await client.getGuild(oldChannel.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;
	if(oldChannel.rawPosition !== newChannel.rawPosition) return;

	// const permA = newChannel.permissionOverwrites.allow
	// // const permR = oldChannel.permissionOverwrites.deny.FLAGS.toArray();
	// console.log(newChannel.permissionOverwrites)
	// console.log(oldChannel.permissionOverwrites)
	// console.log(permA)
	// console.log(permR)
    // let permA = arrN.filter(x => !arrO.includes(x));
    // let permR = arrO.filter(x => !arrN.includes(x));
    // const permAddedString = permA;
    // const permRemovedString = permR;
    
	let categorie = oldChannel.type === 'category' ? 'Category' : `${oldChannel.type === 'text' ? '📝 Text channel' : `${oldChannel.type === 'voice' ? '🔊 Voice channel' : `${oldChannel.type === 'news' ? '📣 News channel' : `${oldChannel.type === 'store' ? '🛒 Store channel' : `❓ Unknown`}`}`}`}`;
	let categorieNew = newChannel.type === 'category' ? 'Category' : `${newChannel.type === 'text' ? '📝 Text channel' : `${newChannel.type === 'voice' ? '🔊 Voice channel' : `${newChannel.type === 'news' ? '📣 News channel' : `${newChannel.type === 'store' ? '🛒 Store channel' : `❓ Unknown`}`}`}`}`;
    const embed = new MessageEmbed()
            .setColor(15105570)
            .setDescription(`**${categorie} updated:** ${oldChannel.name}`)
            .setFooter(`Channel ID: ${newChannel.id}`)
            .setTimestamp();

		if (oldChannel.type != newChannel.type) {
                embed.addField('Type', `${categorie} **->** ${categorieNew}`)
		}
    // Channel name change
		if (oldChannel.name != newChannel.name) {
                embed.addField('Renamed', `${oldChannel.name} **->** ${newChannel.name}`)
		}
	// channel topic (description) change
		if (oldChannel.topic != newChannel.topic) {
                embed.addField('Topic', `${oldChannel.topic ? oldChannel.topic : 'None'} **->** ${newChannel.topic ? newChannel.topic : 'None'}`)
		}
		if (oldChannel.nsfw != newChannel.nsfw) {
			let NSFW = oldChannel.nsfw ? 'Yes' : 'No'
			let NSFWnew = newChannel.nsfw ? 'Yes' : 'No'
			embed.addField('NSFW', `${NSFW} **->** ${NSFWnew}`)
		}
		if (oldChannel.rateLimitPerUser != newChannel.rateLimitPerUser) {
			let slowmode;
			let newSlowmode;

			if(oldChannel.rateLimitPerUser == '0') {
				slowmode = 'Off'
			} else {
				slowmode = `${oldChannel.rateLimitPerUser} secondes`
			}

			if(newChannel.rateLimitPerUser == '0') {
				newSlowmode = 'Off'
			} else {
				newSlowmode = `${newChannel.rateLimitPerUser} secondes`
			}

			embed.addField('Slowmode', `${slowmode} **->** ${newSlowmode}`)
		}
		if (oldChannel.bitrate != newChannel.bitrate) {
			embed.addField('Bitrate', `${oldChannel.bitrate} **->** ${newChannel.bitrate}`)
		}
		if (oldChannel.userLimit != newChannel.userLimit) {
			embed.addField('User limit', `${oldChannel.userLimit} **->** ${newChannel.userLimit}`)
		}
		// Check for permission change
		// if (permA) {
		// 	embed.addField(``)
        //     embed.addField(`✅ Added permissions`, `${permAddedString}`)
        // }
        // if (permR.toString()) {
        //     embed.addField(`❌ Removed permissions`, `${permRemovedString.join(',\n')}`)
        // }

        client.channels.cache.get(settings.logChannel).send(embed);
}