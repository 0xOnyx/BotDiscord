const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    message.delete();
    const channel = message.member.voice.channel
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
    
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.channel.send("There is nothing playing that I could stop for you.", message.channel);
    serverQueue.songs = [];
    serverQueue.voiceChannel.leave();
    message.client.queue.delete(message.guild.id);
    message.channel.send('Deconnexion du channel effectuer avec succès');
    // serverQueue.connection.dispatcher.end("Stop the music");
    // message.react("✅")
};

module.exports.help = {
    name: "stop",
    aliases: ['stop'],
    category: 'music',
    description: "Stop la musique en cours avec un systeme de vote",
    cooldown: 1,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };