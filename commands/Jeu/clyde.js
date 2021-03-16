const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  message.delete();
  
  const clyde = await fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args.slice(0).join(" ")}`)
    .then(res => res.json())
    .then(json => json.message);

  message.channel.send(clyde);
};

module.exports.help = {
  name: "clyde",
  aliases: ['clyde'],
  category: 'jeu',
  description: "Renvoie la photo d'un message de clyde",
  cooldown: 3,
  usage: '<texte>',
  isUserAdmin: false,
  permissions: false,
  args: true
};