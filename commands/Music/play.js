const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return message.channel.send("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);
    if (!permissions.has("SPEAK"))return message.channel.send("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return message.channel.send("You didn't poivide want i want to play", message.channel);

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString)
    if(searched.videos.length === 0)return message.channel.send("Looks like i was unable to find the song on YouTube", message.channel)
    var songInfo = searched.videos[0]

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
      
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Song has been added to queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("YELLOW")
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 75,
      playing: true,
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        message.channel.send("Leaving the voice channel with success.", message.channel)
        queue.voiceChannel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
        return;
      }
      
      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
      .setAuthor("Started Playing Music!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true)
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(`I could not join the voice channel: ${error}`, message.channel);
    }
};

module.exports.help = {
  name: "play",
  aliases: ['play', 'p'],
  category: 'music',
  description: "Joue de la musique",
  cooldown: 1,
  usage: '<nom_de_la_musique>',
  isUserAdmin: false,
  permissions: false,
  args: true
};

// const voiceChannel = message.member.voice.channel;
//   const q = args.join(' ');

//   const embed = new MessageEmbed()
//   .setAuthor(message.author.username, message.author.displayAvatarURL())
//   .setDescription(`Voici les 5 premieres recherches pour \`${q}\` :`)

//   if (voiceChannel) {
//     const player = client.music.players.spawn({
//         guild: message.guild,
//         voiceChannel: voiceChannel,
//         textChannel: message.channel,
//     });

//     client.musicPlayer.set(message.guild.id, player);

//     try {
//         let trackNumber = 0;
//         const musicSearchResults = await client.music.search(q, message.author);
//         const tracks = await musicSearchResults.tracks.slice(0, 5);
//         tracks.map(r => embed.addField(`${++trackNumber}. ${r.title}`, `${r.uri}`));
//         message.channel.send(embed);

//         const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);
//         const userEntry = await message.channel.awaitMessages(filter, {
//             max:1, time: 20000, errors: ['time']
//         });

//         if (userEntry) {
//             const firstUserEntry = userEntry.first().content;
//             const musicPlayer = client.musicPlayer.get(message.guild.id);
//             const track = tracks[firstUserEntry-1];
//             await musicPlayer.queue.add(track);
//             message.channel.send(`${track.title} a ete ajouter a la queue !`)
//             if (!musicPlayer.playing) musicPlayer.play();
//         }
//     } catch (e) {
//         message.channel.send("Probleme avec le client erela, essayer a nouveau jusqu'a que ca marche!")
//     }
//   } else {
//     message.channel.send("Veuillez rejoindre un salon vocal !")
//   }