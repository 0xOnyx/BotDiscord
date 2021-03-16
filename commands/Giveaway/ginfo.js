const { MessageEmbed } = require('discord.js');
// const path = require('path')

module.exports.run = async(client, message, args, settings) => {
  message.delete();

    // let langues = require(path.resolve(path.join('..', 'GWays/database/lang.json')));
    // let lang = langues[message.guild.id].langues;

    let allGiveaways = client.giveawaysManager.giveaways
    let notEnded = client.giveawaysManager.giveaways.filter((g) => !g.ended);
    let ended = client.giveawaysManager.giveaways.filter((g) => g.ended);

    if (settings.langue === 'fr') {

      message.channel.send(
          new MessageEmbed()
            .setTitle('Giveaways')
            .setColor('#2f3136')
            .setDescription(`Total: **${allGiveaways.length}**\nEn cours: **${notEnded.length}**\nTerminés: **${ended.length}**`)
        )
        
    } if (settings.langue === 'en') {

        message.channel.send(
          new MessageEmbed()
            .setTitle('Giveaways')
            .setColor('#2f3136')
            .setDescription(`All giveaways: **${allGiveaways.length}**\nNot ended: **${notEnded.length}**\nEnded: **${ended.length}**`)
        )
    }

}

module.exports.help = {
    name: "ginfo",
    aliases: ['ginfo'],
    category: 'giveaway',
    description: "Avoir des infos sur les giveaway du bot",
    cooldown: 3,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };