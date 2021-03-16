const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => { 
    message.delete();
    
    const test = await fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.splice(0).join(" ")}`)
    .then(res => res.json())
    .then(json => json.message);

    message.channel.send(test);
}

module.exports.help = {
    name: "fake-tweet",
    aliases: ['fake-tweet', 'f-t'],
    category: 'images',
    description: "Creer un faux tweet",
    cooldown: 3,
    usage: '<contenu du tweet>',
    isUserAdmin: false,
    permissions: false,
    args: true
  };