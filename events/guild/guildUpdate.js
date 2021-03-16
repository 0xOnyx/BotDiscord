const { MessageEmbed } = require('discord.js');

module.exports = async(client, oldGuild, newGuild) => {
// Get server settings
let settings = await client.getGuild(newGuild);
const url = `https://cdn.discordapp.com/icons/${oldGuild.id}/${oldGuild.icon}.webp?size=1024`
const embed = new MessageEmbed()
.setColor(15105570)
.setThumbnail(url)
.setDescription(`**Server information updated!**`)
.setTimestamp();

// Check for updates
// region change
if (oldGuild.region != newGuild.region) {
    embed.addField('Region:', `${oldGuild.region} **->** ${newGuild.region}`)
}
if (oldGuild.name != newGuild.name) {
        embed.addField('Renamed:', `${oldGuild.name} **->** ${newGuild.name}`)
    // client.updateGuild(newGuild, { guildName: newGuild.name });
}
if (oldGuild.description != newGuild.description) {
    embed.addField('Description:', `${oldGuild.description} **->** ${newGuild.description}`)
}
// icon change
if (oldGuild.icon != newGuild.icon) {
    embed.addField('Icon:', `[[before]](https://cdn.discordapp.com/icons/${oldGuild.id}/${oldGuild.icon}.webp) **->** [[after]](https://cdn.discordapp.com/icons/${newGuild.id}/${newGuild.icon}.webp)`)
}
// verification level change
if (oldGuild.verificationLevel != newGuild.verificationLevel) {
    embed.addField('Verification level:', `${oldGuild.verificationLevel} **->** ${newGuild.verificationLevel}`)
}
// owner change
if (oldGuild.owner != newGuild.owner) {
    embed.addField('Owner:', `${oldGuild.owner} **->** ${newGuild.owner}`)
}
// verification level change
if (oldGuild.verificationLevel != newGuild.verificationLevel) {
    embed.addField('Verification level:', `${oldGuild.verificationLevel} **->** ${newGuild.verificationLevel}`)
}
// // Server's boost level has increased
// if (oldGuild.premiumTier < newGuild.premiumTier) {
//     embed = new MessageEmbed()
//         .setDescription('**Server boost increased**')
//         .setAuthor(newGuild.name, newGuild.iconURL())
//         .addField('Before:', oldGuild.premiumTier)
//         .addField('After:', newGuild.premiumTier)
//         .setTimestamp();
// }
// // Server's boost level has decreased
// if (oldGuild.premiumTier > newGuild.premiumTier) {
//     embed = new MessageEmbed()
//         .setDescription('**Server boost decreased**')
//         .setAuthor(newGuild.name, newGuild.iconURL())
//         .addField('Before:', oldGuild.premiumTier)
//         .addField('After:', newGuild.premiumTier)
//         .setTimestamp();
// }
// Server has got a new banner
if (!oldGuild.banner && newGuild.banner) {
    embed.addField('Banner:', `${oldGuild.banner} **->** ${newGuild.banner}`)
}
// Server has made a AFK channel
if (!oldGuild.afkChannel && newGuild.afkChannel) {
    embed.addField('AFK channel:', `${oldGuild.afkChannel} **->** ${newGuild.afkChannel}`)
}
if (!oldGuild.afkTimeout && newGuild.afkTimeout) {
    let afkT;
	let newAfkT;

			if(oldChannel.afkTimeout == '0') {
				afkT = 'Off'
			} else {
				afkT = `${oldChannel.afkTimeout} secondes`
			}

			if(newChannel.afkTimeout == '0') {
				newAfkT = 'Off'
			} else {
				newAfkT = `${newChannel.afkTimeout} secondes`
            }
            
    embed.addField('AFK timeout:', `${afkT} **->** ${newAfkT}`)
}
// Server now has a vanity URL
if (!oldGuild.vanityURLCode && newGuild.vanityURLCode) {
    embed.addField('Vanity URL:', `${oldGuild.vanityURLCode} **->** ${oldGuild.vanityURLCode}`)
}

client.channels.cache.get(settings.logChannel).send(embed);
}