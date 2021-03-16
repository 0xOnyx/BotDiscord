const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = async(client, guild) => {
    client.statusHook = new WebhookClient("787635759644409897", "qD6cBXZnGua-uv-YbNGNf3nsLrsZLXdTCghbXvBTkA_5NuQvfQqwCaehR4edOrO30b4a");
    // const embed = new MessageEmbed()
    //     .setColor('#ff0000')
    //     .setTitle("Un serveur vient de retirer YZZY")
    //     .setThumbnail(guild.iconURL())
    //     .addField('Nom du serveur:', guild.name)
    //     .addField('Owner du serveur:', guild.owner)
    //     .addField('Nombre de membre:', guild.memberCount)
    //     .setFooter(`Bot retirer || ${client.guilds.cache.size.toString()} serveurs`, client.user.displayAvatarURL())
    //     .setTimestamp();

    // client.channels.cache.get('744997699140452404').send(embed);
    const couronne = "<:owner:769141769946267649>";
    const hashtag = "<:channels:769141755714732072>";
    const user = "<:users:769141777277648916>";
    const id = "<:identifiant:769141762316042241>";

    const embed = new MessageEmbed()
        .setColor('#00ff16')
        .setTitle("Un serveur vient de retirer YZZY")
        .setThumbnail(guild.bannerURL())
        .addField('<:users:769141777277648916> Nombre de membre:', guild.memberCount)
        .setDescription(`<:owner:769141769946267649> **Serveur:** ${guild.name}\n${couronne} **Créateur:** ${guild.owner}\n${user} **Membres:** ${guild.memberCount}\n${hashtag} **Salons:** ${client.channels.cache.size.toString()}\n${id} **Identifiants:** ${guild.id}`)
        .setFooter(`Ajout du bot || ${client.guilds.cache.size.toString()} serveurs`, client.user.displayAvatarURL())
        .setTimestamp();

    client.statusHook.send(embed);
}