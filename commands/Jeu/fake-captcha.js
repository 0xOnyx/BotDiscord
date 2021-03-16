const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => { 
    message.delete();
    let member = message.member;
    if (args[0]) member = message.guild.member(message.mentions.users.first()); 
    let user = member.user;

    const captcha = await fetch(`https://nekobot.xyz/api/imagegen?type=captcha&url=${user.displayAvatarURL()}&username=${user.tag}`)
    .then(res => res.json())
    .then(json => json.message);

    message.channel.send(captcha);
}

module.exports.help = {
    name: "fake-captcha",
    aliases: ['fake-captcha', 'f-c'],
    category: 'jeu',
    description: "Creer un faux captcha",
    cooldown: 3,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };