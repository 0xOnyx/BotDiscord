

module.exports.run = async (client, message, args, settings) => {
    message.delete();
    const channel = message.member.voice.channel
    if (!channel) return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    if (channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
    
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing that I could skip for you.", message.channel);
    serverQueue.connection.dispatcher.end();
};

module.exports.help = {
    name: "skip",
    aliases: ['skip', 's'],
    category: 'music',
    description: "Skip la musique en cours avec un systeme de vote",
    cooldown: 1,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };

  /*
  const voiceChannel = message.member.voice.channel;
    const musicPlayer = client.musicPlayer.get(message.guild.id);
    if (!(musicPlayer && voiceChannel) && (musicPlayer.voiceChannel.id === voiceChannel.id)) message.channel.send("Veuillez rejoindre le meme salon que le bot !")
  
    const membersInChannel = voiceChannel.members.filter(m => !m.user.bot);

    if (membersInChannel.size === 1) {
        musicPlayer.stop();
        message.channel.send(`Musique skip : ${musicPlayer.queue[0].title}`);
    } else {
        const msg = await message.channel.send(`Vote requis : ${membersInChannel.size}`);
        await msg.react("<:check:730881798866993283>");
        await msg.react("<:no_check:730881778281218159>");

        const f = (r, u) => {
            if (u.bot) return false;
            const isMembersInChannel = message.guild.members.cache.get(u.id).voice.channel;
            if (isMembersInChannel) {
                if (isMembersInChannel.id === musicPlayer.voiceChannel.id) {
                    return ['<:check:730881798866993283>'].includes(r.emoji.name);
                }
                return false;
            } else {
                return false;
            }
        }
        const r = await msg.awaitReactions(f,  {max: membersInChannel.size, time: 10000, errors: ['time']});
        const votes = r.get('<:check:730881798866993283>').users.cache.filter(u => !u.bot);
        if (votes.size >= membersInChannel.size) musiquePlayer.stop();
    }*/