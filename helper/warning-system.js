const { Warning } = require('../models/warnings');
const { Warns } = require("../models/index");
const { MessageEmbed } = require('discord.js');
const mongoose = require("mongoose");

module.exports.run = (client, message, member, utilisateur, wReason, settings) => {
	// retrieve user data in warning database
	Warns.findOne({
		userID: utilisateur.id,
		guildID: message.guild.id,
	}, async (err, res) => {
		if (err) console.log(err);
		// This is their first Warns
		if (!res) {
			try {
				const newWarn = new Warns({
                    _id: mongoose.Types.ObjectId(),
					userID: utilisateur.id,
					guildID: message.guild.id,
					guildName: message.guild.name,
					Warnings: 1,
					Reason: [`${wReason}`],
					Moderater: [`${(message.author.id == utilisateur.id) ? client.user.id : message.author.id}`],
					IssueDates: [`${new Date().toUTCString()}`],
				});
				await newWarn.save().catch(e => console.log(e.message));
				const embed = new MessageEmbed()
					.setColor(15158332)
					.setAuthor(`Warn effectuer`, utilisateur.displayAvatarURL())
					.setDescription(`Modérateur: ${message.author.tag}
					Utilisateur: ${utilisateur.tag}
					Raison: ${wReason}`)
					.setTimestamp();
				message.channel.send(embed).then(m => m.delete({ timeout: 10000 }));
			} catch (err) {
				console.log(`${err} when running command: warnings.`);
				message.channel.send(`Il y a eu un probleme lors de l'avertissement de l'utilisateur`).then(m => m.delete({ timeout: 5000 }));
			}
		} else {
			// This is NOT their warning
			res.Warnings++;
			res.Reason.push(wReason);
			res.IssueDates.push(new Date().toUTCString());
            res.Moderater.push(message.author.id);
			res.save().catch(e => console.log(e));
			
			const embed = new MessageEmbed()
					.setColor(15158332)
					.setAuthor(`Warn effectuer`, utilisateur.displayAvatarURL())
					.setDescription(`Modérateur: ${message.author.tag}
					Utilisateur: ${utilisateur.tag}
					Raison: ${wReason}`)
					.setTimestamp();
				message.channel.send(embed).then(m => m.delete({ timeout: 10000 }));
			// if (res.Warnings == 2) {
			// 	// Mutes user
			// 	let muteTime;
			// 	const muteRole = message.guild.roles.cache.find(role => role.id == settings.MutedRole);
			// 	if (muteRole) {
			// 		// 5 minutes
			// 		muteTime = 300000;
			// 		await (member.roles.add(muteRole));
			// 	}
			// 	const embed = new MessageEmbed()
			// 		.setColor(15158332)
			// 		.setAuthor(message.translate(settings.Language, 'MODERATION/SUCCESSFULL_WARN', member.user.tag), member.user.displayAvatarURL())
			// 		.setDescription(message.translate(settings.Language, 'MODERATION/REASON', wReason));
			// 	message.channel.send(embed).then(m => m.delete({ timeout: 30000 }));
			// 	// update database
			// 	res.save().catch(e => console.log(e));
			// 	// remove role after time
			// 	if (muteRole) {
			// 		setTimeout(() => {
			// 			member.roles.remove(muteRole).catch(e => console.log(e));
			// 		}, muteTime);
			// 	}
			// } else {
			// 	try {
			// 		await message.guild.member(member).kick(wReason);
			// 		message.success(settings.Language, 'MODERATION/SUCCESSFULL_KWARNS').then(m => m.delete({ timeout: 3500 }));
			// 		// Delete user from database
			// 		Warning.collection.deleteOne({ userID: member.user.id, guildID: message.guild.id });
			// 	} catch (e) {
			// 		console.log(`${err.message} when kicking user.`);
			// 		message.error(settings.Language, 'MODERATION/TOO_POWERFUL').then(m => m.delete({ timeout: 10000 }));
			// 	}
			// }
        }
    })
}