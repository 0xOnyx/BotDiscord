const { Util, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    // if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return message.channel.send("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);
    if (!permissions.has("SPEAK"))return message.channel.send("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel);

    // var serverQueue = message.client.queue.get(message.guild.id);

    // if (serverQueue) {
    //     serverQueue.songs.push(song);
    //     let thing = new MessageEmbed()
    //     .setAuthor("Song has been added to queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    //     .setThumbnail(song.img)
    //     .setColor("YELLOW")
    //     .addField("Name", song.title, true)
    //     .addField("Duration", song.duration, true)
    //     .addField("Requested by", song.req.tag, true)
    //     .setFooter(`Views: ${song.views} | ${song.ago}`)
    //     return message.channel.send(thing);
    //   }

let radio;
let RADIO;
let Nradio;

const msg = await message.channel.send(`**Veuillez entrer un nombre corespondant a la radio que vous souhaitait ecouter:**
1 - SKYROCK
2 - FRANCE INFO
3 - BEUR FM
4 - CHERIE FM
5 - LATINA
6 - RTL 2
7 - RMC
8 - TSF JAZZ
9 - RIRE ET CHANSON
10 - RFM
11 - ORIENT
12 - NOVA
13 - VIRGIN
14 - MOUV
15 - FUNRADIO
16 - NRJ 12
17 - Annuler

**La radio que vous voulez n'est pas la ? Demandez la sur le serveur support !**

PS: Les commandes radio et musique sont tres instable il est possible que la musique se coupe en pleine ecoute. Veuillez nous excuser pour la gene ocasionner.
`)

// .then(m => m.delete({ timeout: 20000,}));

await message.channel.awaitMessages(m => m.author.id === message.author.id, {
  max: 1,
  time: 20000,
  errors: ["time"]
}).then(collected => {
  RADIO = collected.first().content;
  collected.first().delete()

  switch(RADIO) {
  case '1': {
   radio = `${client.radioURL.SKYROCK}`
   Nradio = `SKYROCK`
   break;
  }
  case '2': {
    radio = `${client.radioURL.FRANCE_INFO}`
    Nradio = `FRANCE INFO`
    break;
  }
  case '3': {
    radio = `${client.radioURL.BEUR_FM}`
    Nradio = `BEUR FM`
    break;
  }
  case '4': {
    radio = `${client.radioURL.CHERIE_FM}`
    Nradio = `CHERIE FM`
    break;
  }
  case '5': {
    radio = `${client.radioURL.LATINA}`
    Nradio = `LATINA`
    break;
  }
  case '6': {
    radio = `${client.radioURL.RTL_2}`
    Nradio = `RTL 2`
    break;
  }
  case '7': {
    radio = `${client.radioURL.RMC}`
    Nradio = `RMC`
    break;
  }
  case '8': {
    radio = `${client.radioURL.TSF_JAZZ}`
    Nradio = `TSF JAZZ`
    break;
  }
  case '9': {
    radio = `${client.radioURL.RIRE_ET_CHANSON}`
    Nradio = `RIRE ET CHANSON`
    break;
  }
  case '10': {
    radio = `${client.radioURL.RFM}`
    Nradio = `RFM`
    break;
  }
  case '11': {
    radio = `${client.radioURL.ORIENT}`
    Nradio = `RADIO ORIENT`
    break;
  }
  case '12': {
    radio = `${client.radioURL.NOVA}`
    Nradio = `NOVA`
    break;
  }
  case '13': {
    radio = `${client.radioURL.VIRGIN}`
    Nradio = `VIRGIN`
    break;
  }
  case '14': {
    radio = `${client.radioURL.MOUV}`
    Nradio = `MOUV`
    break;
  }
  case '15': {
    radio = `${client.radioURL.FUNRADIO}`
    Nradio = `FUNRADIO`
    break;
  }
  case '16': {
    radio = `${client.radioURL.NRJ_12}`
    Nradio = `NRJ 12`
    break;
  }
  case '17': {
    msg.delete()
    return message.channel.send('Commande annuler').then(m => m.delete({ timeout: 5000,}));
    break;
  }
  default :
  msg.delete()
      return message.channel.send(`<:no_check:730881778281218159> Veuillez choisir un chiffre entre 1 et 17`)
      break;

}
}).catch((err) => {
  msg.delete()
      const embed = new MessageEmbed()
      .setTitle('ERREUR')
      .setColor('RED')
      .setDescription("Vous n'avez pas entrer de nombre. Annulation...")
      .setTimestamp()
      return message.channel.send(embed)
})

    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 75,
        playing: true,
      };
      message.client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(radio);

    const play = async (client) => {
      msg.delete()
        const queue = message.client.queue.get(message.guild.id);
        // queue.songs.push(radio);
        // if (!song) {
        //   message.channel.send("Leaving the voice channel with success.", message.channel)
        //   queue.voiceChannel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        //   message.client.queue.delete(message.guild.id);
        //   return;
        // }
        
        const dispatcher = queue.connection
          .play(radio)
          .on("error", (error) => console.error(error));
        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        let thing = new MessageEmbed()
        .setAuthor("Started Playing radio!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
        .setColor("BLUE")
        .setDescription(`Radio joué: ${Nradio}`)
        queue.textChannel.send(thing);
      };

      try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        channel.guild.voice.setSelfDeaf(true)
        play(radio);
      } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`I could not join the voice channel: ${error}`, message.channel);
      }
}

module.exports.help = {
    name: "radio",
    aliases: ['radio'],
    category: 'music',
    description: "Ecouter une station radio",
    cooldown: 3,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };