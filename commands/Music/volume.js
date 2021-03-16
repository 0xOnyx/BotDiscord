const { MessageEmbed, ClientVoiceManager } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
    
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing in this server.", message.channel);

    if (!args[0])return message.channel.send(`🔊 The current volume is: **${serverQueue.volume}%**`);

    if (isNaN(args[0])) return message.reply("Please use a number to set volume.").catch(console.error);
    if (Number(args[0]) > 150 || Number(args[0]) < 0 )
      return message.reply("Please use a number between 0 - 150.").catch(console.error);

    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    let xd = new MessageEmbed()
    .setDescription(`I set the volume to: **${args[0]}/150**`)
    .setAuthor("Server Volume Manager", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
    };

module.exports.help = {
  name: "volume",
  aliases: ['volume', 'v'],
  category: 'music',
  description: "Change le volume de la musique",
  cooldown: 1,
  usage: '<volume>',
  isUserAdmin: false,
  permissions: false,
  args: false
};

/*

const voiceChannel = message.member.voice.channel;
    const musicPlayer = client.musicPlayer.get(message.guild.id);
   
   
    if (settings.langue === 'fr') {
      if (!(musicPlayer && voiceChannel) && (musicPlayer.voiceChannel.id === voiceChannel.id)) message.channel.send("Veuillez rejoindre le meme salon que le bot !")
  
      if (args[0]) {
          if (!isNaN(args[0]) && args[0] > 0 && args[0] <= 100) {
              musicPlayer.setVolume(args[0]);
              message.channel.send(`Le volume est maintenant a ${args[0]}`);
          } else {
              message.channel.send("Merci de choisir un nombre entre 1 et 100 !");
          } 
      } else {
        message.channel.send(`Le volume est actuellemnt a ${musicPlayer.volume}.`)
      }
    } if (settings.langue === 'en') {
      if (!(musicPlayer && voiceChannel) && (musicPlayer.voiceChannel.id === voiceChannel.id)) message.channel.send("Please join the same channel as the bot!")
  
      if (args[0]) {
          if (!isNaN(args[0]) && args[0] > 0 && args[0] <= 100) {
              musicPlayer.setVolume(args[0]);
              message.channel.send(`The volume is now at ${args[0]}`);
          } else {
              message.channel.send("Please choose a number between 1 and 100 !");
          } 
      } else {
        message.channel.send(`The volume is currently at ${musicPlayer.volume}.`)
      }
    }*/