const { MessageEmbed } = require("discord.js");
const randomDice = () => Math.floor(Math.random() * 6) + 1;

module.exports.run = (client, message, args, settings) => {
  message.delete();
  if (settings.langue === 'fr') {
  const embed = new MessageEmbed()
    .setColor("#ac2d51")
    .setTitle(`Lancement des dés`)
    .setThumbnail("https://cdn.discordapp.com/attachments/705029954844360715/721303774534041640/unnamed.png")
    .addFields(
      { name: "Dés #1", value: randomDice(), inline: true },
      { name: "Dés #2", value: randomDice(), inline: true },
      { name: "Dés #3", value: randomDice(), inline: true },
      { name: "Dés #4", value: randomDice(), inline: true },
      { name: "Dés #5", value: randomDice(), inline: true },
      { name: "Dés #6", value: randomDice(), inline: true }
  );

  embed.setFooter(`Total des dès sur la table: ${embed.fields.reduce((total, obj) => parseInt(obj.value) + total, 0)}`);
  message.channel.send(embed);
    } if (settings.langue === 'en') {
      const embed = new MessageEmbed()
      .setColor("#ac2d51")
      .setTitle(`Throwing the dice`)
      .setThumbnail("https://cdn.discordapp.com/attachments/705029954844360715/721303774534041640/unnamed.png")
      .addFields(
        { name: "Dice #1", value: randomDice(), inline: true },
        { name: "Dice #2", value: randomDice(), inline: true },
        { name: "Dice #3", value: randomDice(), inline: true },
        { name: "Dice #4", value: randomDice(), inline: true },
        { name: "Dice #5", value: randomDice(), inline: true },
        { name: "Dice #6", value: randomDice(), inline: true }
    );
  
    embed.setFooter(`Total dice on the table: ${embed.fields.reduce((total, obj) => parseInt(obj.value) + total, 0)}`);
    message.channel.send(embed);
    }
};

module.exports.help = {
  name: "dice",
  aliases: ['dice'],
  category: 'jeu',
  description: "Renvoie la valeur de plusieurs dés!",
  cooldown: 1,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args: false
};