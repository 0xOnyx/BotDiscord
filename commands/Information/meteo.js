const { MessageEmbed } = require("discord.js");
const weather = require('weather-js');


module.exports.run = async (client, message, args, settings) => {  
  message.delete();

  if (settings.langue === 'fr') {
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
try {

let embed = new MessageEmbed()
.setTitle(`Météo - ${result[0].location.name}`)
.setColor("#031cff")
.setDescription("Les unités de température peuvent être différentes un certain temps")
.addField("Temperature", `${result[0].current.temperature} Celcius`, true)
.addField("Ciel", result[0].current.skytext, true)
.addField("Humidité", result[0].current.humidity, true)
.addField("Vitesse du vent", result[0].current.windspeed, true)//What about image
.addField("Temps d’observation", result[0].current.observationtime, true)
.addField("Affichage du vent", result[0].current.winddisplay, true)
.setThumbnail(result[0].current.imageUrl);
 message.channel.send(embed)
} catch(err) {
return message.channel.send("Impossible d’obtenir les données de l’emplacement donné")
}
})
  }   if (settings.langue === 'en') {
    weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
      try {
      
      let embed = new MessageEmbed()
      .setTitle(`Weather - ${result[0].location.name}`)
      .setColor("#031cff")
      .setDescription("Temperature units may be different for some time")
      .addField("Temperature", `${result[0].current.temperature} Celcius`, true)
      .addField("Sky", result[0].current.skytext, true)
      .addField("Humidity", result[0].current.humidity, true)
      .addField("Wind speed", result[0].current.windspeed, true)//What about image
      .addField("Observation time", result[0].current.observationtime, true)
      .addField("Wind display", result[0].current.winddisplay, true)
      .setThumbnail(result[0].current.imageUrl);
       message.channel.send(embed)
      } catch(err) {
      return message.channel.send("Unable to get data from the given location")
      }
      })
  }
}

module.exports.help = {
    name: "meteo",
    aliases: ['meteo', 'weather', 'weathers'],
    category: 'information',
    description: "Renvoie la meteo d'une ville",
    cooldown: 3,
    usage: '<ville>',
    isUserAdmin: false,
    permissions: false,
    args: true
  };