const { MessageEmbed, MessageAttachment } = require("discord.js");
// const Canvas = require('canvas');
const canvacord = require('canvacord');
const canvas = require("discord-canvas");
const fs = require("fs")
// const createCaptcha = require('../../util/functions.js');

module.exports = async (client, member) => {
	const captcha = await client.createCaptcha();
	const settings = await client.getGuild(member.guild);
  	let msg = settings.welcomeMessage;

	  if(!settings.welcomeChannel || settings.welcomeChannel === 'none') return;
	  
  // Pass the entire Canvas object because you'll need to access its width, as well its context
// const applyText = (canvas, text) => {
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
// 	ctx.fillText(`Bienvenue,`, canvas.width / 2.5, canvas.height / 3.5);

// 	// Add an exclamation point here and below
// 	ctx.font = applyText(canvas, `${member.displayName}!`);
// 	ctx.fillStyle = '#ffffff';
// 	ctx.fillText(`${member.displayName} !`, canvas.width / 2.5, canvas.height / 1.8);

// 	ctx.beginPath();
// 	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
// 	ctx.closePath();
// 	ctx.clip();

// 	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
// 	ctx.drawImage(avatar, 25, 25, 200, 200);

// 	const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');


  const welcomeImage = new canvas.Welcome();

let image = await welcomeImage
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

let attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");

client.channels.cache.get(settings.welcomeChannel).send(attachment);


// const welcomeImg = new canvacord.Welcomer()
//     .setMemberCount(member.guild.memberCount)

// 	welcomeImg.build().then(data => {
// 		  const attachment = new MessageAttachment(data, "WelcomeImg.png");
// 		  message.channel.send(attachment);
// 	  });

  if (msg.includes("{{user}}")) msg = msg.replace("{{user}}", member.user.tag);
  if (msg.includes("{{server}}")) msg = msg.replace("{{server}}", member.guild.name);
  if (msg.includes("{{serveur}}")) msg = msg.replace("{{serveur}}", member.guild.name);
  if (msg.includes("{{nombre}}")) msg = msg.replace("{{nombre}}", member.guild.memberCount);

//   const embed = new MessageEmbed()
//     .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
//     .setColor("#33ff00")
//     .setTitle("Bienvenue "+ member.user.tag +" sur le serveur **"+ member.guild.name +"**. Nous sommes " + member.guild.memberCount)
//     .setDescription("N’oublie pas de regarder le règlement dans <#723984992065159258>")
//     .setFooter("Un utilisateur a rejoint")
//     .setTimestamp();

	client.channels.cache.get(settings.welcomeChannel).send(msg);
	// client.channels.cache.get(settings.welcomeChannel).send(embed);
	// client.channels.cache.get(settings.welcomeChannel).send(attachment);
	if (settings.raidMode === 'on') {
		member.send(`<:info:752923030078095490> **Vous avez été exclu de ${member.guild.name} car ce serveur est en mode raid !** Retentez de le rejoindre ultérieurement.`);
		member.kick(`Mode raid activer`);
		if (!settings.logChannel || settings.logChannel === 'none') return;
		const embed = new MessageEmbed()
		.setTitle(`<:2warning:752924045061914764> Mode raid activer <:2warning:752924045061914764>`)
		.setDescription(`${member.user.tag} a ete kick car le mode raid est activer !`)
		.setFooter(`Pour desactiver le mode raid faite ${settings.prefix}raid-mode off`)
		.setTimestamp();
		client.channels.cache.get(settings.logChannel).send(embed)
	}

  await client.createUser({
    guildID: member.guild.id,
    guildName: member.guild.name,
    userID: member.id,
    username: member.user.tag,
    avatarURL: member.user.avatarURL({ format: 'png' })
  });

// const K = member.kick('Captcha non valide')
  if (settings.captcha === 'on') {
    try {
        const msg = await member.send(`**Entrer le captcha pour etre verifier**. \n(*__Vous avez 30 minutes pour entrer le captcha ou vous serez kick__*)`, {
            files: [{
                attachment: `./captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
					m.author.kick('Captcha non valide');
                    m.channel.send('Le captcha est incorrect.');
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time']});
            if(response) {
                await msg.channel.send('Vous êtes verifier!');
                await member.roles.add(settings.captchaRole);
                await fs.unlink(`../captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }
        catch(err) {
            await fs.unlink(`../captchas/${captcha}.png`)
                    .catch();
        }
    }
    catch(err) {
    }}
};