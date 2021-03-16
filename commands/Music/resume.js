const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const channel = message.member.voice.channel;
  if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
  if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)

  const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("YELLOW")
      .setAuthor("Music has been Resumed!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      return message.channel.send(xd);
    }
    return message.channel.send("There is nothing playing in this server.", message.channel);
  }

module.exports.help = {
        name: "resume",
        aliases: ['resume'],
        category: 'music',
        description: "Remets la musique",
        cooldown: 1,
        usage: '',
        isUserAdmin: false,
        permissions: false,
        args: false
      };

      /*const musicPlayer = client.musicPlayer.get(message.guild.id);
    if (musicPlayer.playing) musicPlayer.pause(false);
    else message.reply(`La musique est deja en train de jouer`)
    (musicPlayer && voiceChannel) && (musicPlayer.voiceChannel.id === voiceChannel.id) ? musicPlayer.pause(false) : message.channel.send("Veuillez rejoindre le meme salon que le bot !")
}*/