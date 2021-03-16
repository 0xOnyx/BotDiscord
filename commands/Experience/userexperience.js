// const {createCanvas, loadImage}= require("canvas");
const canvacord = require("canvacord");
const {MessageAttachment}= require("discord.js");

// module.exports.run = async (client, message, args, settings, dbUser) => {
//   // const user = message.guild.member(message.mentions.users.first());

//   // if (args[0]) {
//   //   const mentionnedUser = await client.getUser(user);
//   //   message.channel.send(`${user} possède ${mentionnedUser.experience} points d'expérience! Et il est level ${mentionnedUser.level}.`);
//   // } else {
//   //   message.reply(`Tu possèdes ${dbUser.experience} points d'expérience! Et tu est level ${dbUser.level}.`);
//   // }

// const canvas = createCanvas(800, 333);
// const ctx = canvas.getContext("2d");
// const background = await loadImage("./canvas/fond_noir.jpg");
// ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

// ctx.beginPath();
// ctx.lineWidth = 2;
// ctx.strokeStyle = "#fff";
// ctx.globalAlpha = 0.4;
// ctx.fillStyle = "#000";
// ctx.fillRect(120, 156, 550, 65);
// ctx.globalAlpha = 1;
// ctx.strokeRect(120, 156, 550, 65);

// ctx.fillStyle = "#dc143c";
// ctx.globalAlpha = 0.8;
// ctx.fillRect(121, 156, (100 / (dbUser.level * 30) * dbUser.experience) * 5.5, 65);

// ctx.globalAlpha = 1;
// ctx.font = "30px Arial"
// ctx.textAlign = "center";
// ctx.fillStyle = "#fff";
// ctx.fillText(`${dbUser.experience} / ${dbUser.level * 30}`, 400, 200);

// ctx.fillText(message.member.user.tag, 217, 100);
// ctx.fillText(`Niveau: ${dbUser.level}`, 183, 140)

// const attachment = new MessageAttachment(canvas.toBuffer(), "exp.png");

// if (message.author.id === '507329636305207308') {
//   message.channel.send(`Carte pour ${message.member.user.username}`, attachment);
// }else {
//   message.channel.send(`Les commandes d'expérience sont temporairement désactivées. Veuillez-nous excuser de la gêne ocasionner.`)
//   }
// };

// module.exports.help = {
//   name: "userexperience",
//   aliases: ['userexperience', 'uexp'],
//   category: 'experience',
//   description: "Renvoie l'expérience de l'utilisateur",
//   cooldown: 1,
//   usage: '[mentionner_une_personne]',
//   isUserAdmin: false,
//   permissions: false,
//   args: false
// };

module.exports.run = async (client, message, args, settings, dbUser) => {
  message.delete();

  // const canvas = createCanvas(800, 333);
  // const ctx = canvas.getContext("2d");
  // const background = await loadImage("./canvas/fond_noir.jpg");
  // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // ctx.beginPath();
  // ctx.lineWidth = 2;
  // ctx.strokeStyle = "#fff";
  // ctx.globalAlpha = 0.4;
  // ctx.fillStyle = "#000";
  // ctx.fillRect(120, 156, 550, 65);
  // ctx.globalAlpha = 1;
  // ctx.strokeRect(120, 156, 550, 65);

  // ctx.fillStyle = "#dc143c";
  // ctx.globalAlpha = 0.8;
  // ctx.fillRect(121, 156, (100 / (dbUser.level * 30) * dbUser.experience) * 5.5, 65);

  // ctx.globalAlpha = 1;
  // ctx.font = "30px Arial"
  // ctx.textAlign = "center";
  // ctx.fillStyle = "#fff";
  // ctx.fillText(`${dbUser.experience} / ${dbUser.level * 30}`, 400, 200);

  // ctx.fillText(message.member.user.tag, 217, 100);
  // ctx.fillText(`Niveau: ${dbUser.level}`, 183, 140)

  // const attachment = new MessageAttachment(canvas.toBuffer(), "exp.png");

  // message.channel.send(`Carte pour ${message.member.user.username}`, attachment);

  
  const img = message.author.avatarURL({ format: 'png' });
  const username = message.author.username;
  const discriminator = message.author.discriminator;
  const lvl = dbUser.level
  const needXp = 5 * (lvl / 2) + 50 * lvl + 300;
  // const data = getDataSomehow();

  const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(dbUser.experience)
    .setRequiredXP(needXp)
    .setLevel(lvl)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(username)
    .setDiscriminator(discriminator);
    
    rank.build().then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });
    
/*
  if (settings.langue === 'en') {
  const user = message.guild.member(message.mentions.users.first());

  if (args[0]) {
    const mentionnedUser = await client.getUser(user);
    message.channel.send(`${user} has ${mentionedUser.experience} experience points! And it is level ${mentionedUser.level}.`);
  } else {
    message.reply(`You have ${dbUser.experience} experience points! And you are level ${dbUser.level}.`);
  }
} if (settings.langue === 'fr') {
  const user = message.guild.member(message.mentions.users.first());

  if (args[0]) {
    const mentionnedUser = await client.getUser(user);
    message.channel.send(`${user} possède ${mentionnedUser.experience} points d'expérience! Et il est level ${mentionnedUser.level}.`);
  } else {
    message.reply(`Tu possèdes ${dbUser.experience} points d'expérience! Et tu est level ${dbUser.level}.`);
  }
}
*/
};

module.exports.help = {
  name: "userexperience",
  aliases: ['userexperience', 'uexp'],
  category: 'experience',
  description: "Renvoie l'expérience de l'utilisateur",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};