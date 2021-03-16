const fetch = require("node-fetch");
const { MessageEmbed, Message } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  if (settings.langue === 'fr') {
    if(!message.channel.nsfw) return message.reply("Vous devez être dans un salon NSFW !");
      if (!message.channel.permissionsFor(client.user.id).has('EMBED_LINKS')) {
          return message.channel.send(`**Je n'ai pas la permission "Intégrer des liens"**`).catch();
      }
    } if (settings.langue === 'en') {
      if(!message.channel.nsfw) return message.reply("You must be in an NSFW channel !");
      if (!message.channel.permissionsFor(client.user.id).has('EMBED_LINKS')) {
          return message.channel.send(`**I do not have the "Embed links" permission**`).catch();
      }
    }

    const neko = await fetch("https://nekos.life/api/v2/img/hentai")
    .then(res => res.json())
    .then(json => json.url);

  const embed = new MessageEmbed()
    .setImage(neko);

  message.channel.send(embed);
};

module.exports.help = {
  name: "hentai",
  aliases: ['hentai'],
  category: 'nsfw',
  description: "Renvoie la photo d'un hentai",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};