const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  if(message.author.id == '507329636305207308') {
    const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)

  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send("There is nothing playing in this server.", message.channel);
  let song = serverQueue.songs[0]
  let thing = new MessageEmbed()
    .setAuthor("Now Playing", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setThumbnail(song.img)
    .setColor("BLUE")
    .addField("Name", song.title, true)
    .addField("Duration", song.duration, true)
    .addField("Requested by", message.author.tag, true)
    .setFooter(`Views: ${song.views} | ${song.ago}`)
  return message.channel.send(thing)
  } else {
message.channel.send(`Nous avons un gros probleme avec les commandes info et queue, elles sont momentanement indisponible.`)
  }
}

module.exports.help = {
        name: "info",
        aliases: ['info', 'infos', 'inf', 'information'],
        category: 'music',
        description: "Donne des infos sur la musique",
        cooldown: 1,
        usage: '',
        isUserAdmin: false,
        permissions: false,
        args: false
      };