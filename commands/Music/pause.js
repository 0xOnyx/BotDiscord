const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
  if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setAuthor("Music has been paused!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      return message.channel.send(xd);
    }
    return message.channel.send("There is nothing playing in this server.", message.channel);
  }

module.exports.help = {
        name: "pause",
        aliases: ['pause'],
        category: 'music',
        description: "Met en pause la musique",
        cooldown: 1,
        usage: '',
        isUserAdmin: false,
        permissions: false,
        args: false
      };

    //   const musicPlayer = client.musicPlayer.get(message.guild.id);
    // if (musicPlayer.playing) musicPlayer.pause(true);
    // else message.reply(`Aucune musique n'est actuellement en cours, je ne peux pas faire pause`)
    // (musicPlayer && voiceChannel) && (musicPlayer.voiceChannel.id === voiceChannel.id) ? musicPlayer.pause(true) : message.channel.send("Veuillez rejoindre le meme salon que le bot !")
