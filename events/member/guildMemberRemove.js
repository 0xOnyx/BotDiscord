const { MessageEmbed, MessageAttachment } = require("discord.js");
// const Canvas = require('canvas');
const canvas = require("discord-canvas");

module.exports = async (client, member, user) => {
	const settings = await client.getGuild(member.guild);
	if(!settings.leaveChannel || settings.leaveChannel === 'none') return;
	let msg = settings.leaveMessage;
	const channel = client.channels.cache.get(settings.leaveChannel);

//   const embed = new MessageEmbed()
//     .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
//     .setColor("#ff0000")
//     .setTitle(`Bye bye, nous sommes ${member.guild.memberCount}`)
//     .setFooter("Un utilisateur a quitté")
//     .setTimestamp();

if (settings.langue === 'fr') {
     // Pass the entire Canvas object because you'll need to access its width, as well its context
// 	const applyText = (canvas, text) => {
// 	const ctx = canvas.getContext('2d');

// 	// Declare a base size of the font
// 	let fontSize = 70;

// 	do {
// 		// Assign the font to the context and decrement it so it can be measured again
// 		ctx.font = `${fontSize -= 10}px sans-serif`;
// 		// Compare pixel width of the text to the canvas minus the approximate avatar size
// 	} while (ctx.measureText(text).width > canvas.width - 300);

// 	// Return the result to use in the actual canvas
// 	return ctx.font;
// };


// const canvas = Canvas.createCanvas(700, 250);
// 	const ctx = canvas.getContext('2d');

// 	// const background = await Canvas.loadImage("./canvas/fond_noir.jpg");
// 	const background = await Canvas.loadImage("https://th.bing.com/th/id/OIP.HtmR27UKO817_l3eU2RK3AHaEK?w=290&h=180&c=7&o=5&pid=1.7");
// 	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

// 	ctx.strokeStyle = '#74037b';
// 	ctx.strokeRect(0, 0, canvas.width, canvas.height);

// 	// Slightly smaller text placed above the member's display name
// 	ctx.font = '28px sans-serif';
// 	ctx.fillStyle = '#ffffff';
// 	ctx.fillText(`Au revoir,`, canvas.width / 2.5, canvas.height / 3.5);

// 	// Add an exclamation point here and below
// 	ctx.font = applyText(canvas, `${member.displayName}!`);
// 	ctx.fillStyle = '#ffffff';
// 	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

// 	ctx.beginPath();
// 	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
// 	ctx.closePath();
// 	ctx.clip();

// 	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
// 	ctx.drawImage(avatar, 25, 25, 200, 200);



const goodbyeCanvas = new canvas.Goodbye();

let image = await goodbyeCanvas
.setUsername(member.user.username)
.setDiscriminator(member.user.tag)
.setMemberCount(member.guild.memberCount)
.setGuildName(member.guild.name)
.setAvatar(member.user.avatarURL({ format: 'png' }))
.setColor("border", "#8015EA")
.setColor("username-box", "#8015EA")
.setColor("discriminator-box", "#8015EA")
.setColor("message-box", "#8015EA")
.setColor("title", "#8015EA")
.setColor("avatar", "#8015EA")
.setBackground("https://th.bing.com/th/id/OIP.HtmR27UKO817_l3eU2RK3AHaEK?w=290&h=180&c=7&o=5&pid=1.7")
.toAttachment();

let attachment = new MessageAttachment(image.toBuffer(), "goodbye-image.png");

	if (msg.includes("{{user}}")) msg = msg.replace("{{user}}", member.user.tag);
	if (msg.includes("{{server}}")) msg = msg.replace("{{server}}", member.guild.name);
	if (msg.includes("{{serveur}}")) msg = msg.replace("{{serveur}}", member.guild.name);
	if (msg.includes("{{nombre}}")) msg = msg.replace("{{nombre}}", member.guild.memberCount);

  	// const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(msg);
	// channel.send(embed);
	channel.send(attachment);



} if (settings.langue === 'en') {
// Pass the entire Canvas object because you'll need to access its width, as well its context
	// const applyText = (canvas, text) => {
	// const ctx = canvas.getContext('2d');

	// // Declare a base size of the font
	// let fontSize = 70;

	// do {
	// 	// Assign the font to the context and decrement it so it can be measured again
	// 	ctx.font = `${fontSize -= 10}px sans-serif`;
	// 	// Compare pixel width of the text to the canvas minus the approximate avatar size
	// } while (ctx.measureText(text).width > canvas.width - 300);

	// // Return the result to use in the actual canvas
	// return ctx.font;
// };

// const canvas = Canvas.createCanvas(700, 250);
// 	const ctx = canvas.getContext('2d');

// 	// const background = await Canvas.loadImage("./canvas/fond_noir.jpg");
// 	const background = await Canvas.loadImage("https://th.bing.com/th/id/OIP.HtmR27UKO817_l3eU2RK3AHaEK?w=290&h=180&c=7&o=5&pid=1.7");
// 	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

// 	ctx.strokeStyle = '#74037b';
// 	ctx.strokeRect(0, 0, canvas.width, canvas.height);

// 	// Slightly smaller text placed above the member's display name
// 	ctx.font = '28px sans-serif';
// 	ctx.fillStyle = '#ffffff';
// 	ctx.fillText(`Goodbye,`, canvas.width / 2.5, canvas.height / 3.5);

// 	// Add an exclamation point here and below
// 	ctx.font = applyText(canvas, `${member.displayName}!`);
// 	ctx.fillStyle = '#ffffff';
// 	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

// 	ctx.beginPath();
// 	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
// 	ctx.closePath();
// 	ctx.clip();

// 	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
// 	ctx.drawImage(avatar, 25, 25, 200, 200);

const goodbyeCanvas = new canvas.Goodbye();

let image = await goodbyeCanvas
.setUsername(member.user.username)
.setDiscriminator(member.user.tag)
.setMemberCount(member.guild.memberCount)
.setGuildName(member.guild.name)
.setAvatar(member.user.avatarURL({ format: 'png' }))
.setColor("border", "#8015EA")
.setColor("username-box", "#8015EA")
.setColor("discriminator-box", "#8015EA")
.setColor("message-box", "#8015EA")
.setColor("title", "#8015EA")
.setColor("avatar", "#8015EA")
.setBackground("https://th.bing.com/th/id/OIP.HtmR27UKO817_l3eU2RK3AHaEK?w=290&h=180&c=7&o=5&pid=1.7")
.toAttachment();

let attachment = new MessageAttachment(image.toBuffer(), "goodbye-image.png");

	if (msg.includes("{{user}}")) msg = msg.replace("{{user}}", member.user.tag);
	if (msg.includes("{{server}}")) msg = msg.replace("{{server}}", member.guild.name);
	if (msg.includes("{{serveur}}")) msg = msg.replace("{{serveur}}", member.guild.name);
	if (msg.includes("{{nombre}}")) msg = msg.replace("{{nombre}}", member.guild.memberCount);

  	// const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(msg);
	// channel.send(embed);
	channel.send(attachment);
}
}