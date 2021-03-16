const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const YouTube = require("youtube-sr");
 
module.exports.run = async (client, message, args) => {
    message.delete();
    const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return message.channel.send("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);
    if (!permissions.has("SPEAK"))return message.channel.send("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return message.channel.send("You didn't poivide want i want to search", message.channel);

    var serverQueue = message.client.queue.get(message.guild.id);

    if (serverQueue) {
      if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
    }
    try {
                    var searched = await YouTube.search(searchString, { limit: 10 });
          if (searched[0] == undefined)return message.channel.send("Looks like i was unable to find the song on YouTube", message.channel);
                    let index = 0;
                    let embedPlay = new MessageEmbed()
                        .setColor("BLUE")
                        .setAuthor(`Results for \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                        .setDescription(`${searched.map(video2 => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url})`).join("\n")}`)
                        // **\`${index}\`  |** [\`Cancel\`]\n 
                        //  - \`${video2.durationFormatted}\`
                        .setFooter("Type the number of the song to add it to the playlist");
                    // eslint-disable-next-line max-depth
                    const e = await message.channel.send(embedPlay)
                    // .then(m => m.delete({
                    //     timeout: 15000
                    // }))
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                        })
                        // .then((collected) => {
                        //   collected.first().content == '0' ? e.delete() : ''
                        // })
                    } catch (err) {
                        console.error(err);
                        e.delete()
                        return message.channel.send({
                            embed: {
                                color: "RED",
                                description: "Nothing has been selected within 20 seconds, the request has been canceled."
                            }
                        });
                    }
                    e.delete()
                    const videoIndex = parseInt(response.first().content);
                    var video = await (searched[videoIndex - 1])
                    response.delete()
		    
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "🆘  **|**  I could not obtain any search results"
                        }
                    });
                }
            
            response.delete();
  var songInfo = video

    const song = {
      id: songInfo.id,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      ago: songInfo.uploadedAt,
      duration: songInfo.durationFormatted,
      url: `https://www.youtube.com/watch?v=${songInfo.id}`,
      img: songInfo.thumbnail.url,
      req: message.author
    };

    if (serverQueue) {
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
      volume: 2,
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
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
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
    name: "search",
    aliases: ['search'],
    category: 'music',
    description: "Cherche une musique",
    cooldown: 1,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };