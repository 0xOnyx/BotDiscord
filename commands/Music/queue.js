const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    message.delete();
    if(message.author.id == '507329636305207308') {
      const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
    
    const serverQueue = message.client.queue.get(message.guild.id);
    console.log(serverQueue)
    if (!serverQueue) return message.channel.send("There is nothing playing in this server.", message.channel);


    let queue = new MessageEmbed()
    .setAuthor("Server Songs Queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    .addField("Now Playing", serverQueue.songs[0].title, true)
    .addField("Text Channel", serverQueue.textChannel, true)
    .addField("Voice Channel", serverQueue.voiceChannel, true)
    .setDescription(serverQueue.songs.map((song) => {
      if(song === serverQueue.songs[0])return
      return `**-** ${song.title}`
    }).join("\n"))
    .setFooter("Currently Server Volume is "+serverQueue.volume)
    if(serverQueue.songs.length === 1)queue.setDescription(`No songs to play next add songs by \`\`${settings.prefix}play <song_name>\`\``)
    message.channel.send(queue)
  } else {
    message.channel.send(`Nous avons un gros probleme avec les commandes info et queue, elles sont momentanement indisponible.`)
      }
  }

module.exports.help = {
    name: "queue",
    aliases: ['queue'],
    category: 'music',
    description: "Affiche toute les musiques de la queue",
    cooldown: 1,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };

//   const voiceChannel = message.member.voice.channel;
//     const musicPlayer = client.musicPlayer.get(message.guild.id);
  
//     const embed = new MessageEmbed()
//     .setTitle(`Voici la liste des 5 prochaines musiques :`)
//     .setDescription(`Musique actuelle : [${musicPlayer.queue[0].title}](${musicPlayer.queue[0].uri})`);

//     const queueEmbed = queue => {
//         for (let i = 0; i < queue.length; i++) {
//             const nextTracks = queue.slice((i + 1), 6);
//             nextTracks.map(t => embed.addField(`${++i}. ${t.title}`, `${t.uri}`));
//         }
//         return message.channel.send(embed);
//     }

//     (musicPlayer && voiceChannel) && (musicPlayer.voiceChannel.id === voiceChannel.id) ? queueEmbed(musicPlayer.queue) : message.channel.send("Veuillez rejoindre le meme salon que le bot !")
// }