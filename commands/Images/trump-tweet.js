const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => { 
    message.delete();
    
    const test = await fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args.splice(0).join(" ")}`)
    .then(res => res.json())
    .then(json => json.message);

    message.channel.send(test);
}

module.exports.help = {
    name: "trump-tweet",
    aliases: ['trump-tweet', 't-t'],
    category: 'images',
    description: "Creer un faux tweet de Donald Trump",
    cooldown: 3,
    usage: '<texte a dire>',
    isUserAdmin: false,
    permissions: false,
    args: true
  };