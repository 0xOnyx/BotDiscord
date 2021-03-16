const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = async(client, guild) => {
    client.statusHook = new WebhookClient("787635677960732692", "ZaYL8x-IQ-H4v1IC3FsV2QTryZJZ9MqF-CpQIV8bWwqrRyqdY1iFjInCci9Fgdxk5xBs");
    const newGuild = {
        guildID: guild.id,
        guildName: guild.name
    };
    const couronne = "<:couronne:786683402404888587>";
    const hashtag = "<:Channel:786683642751483907>";
    const user = "<:users:769141777277648916>";
    const id = "<:identifiant:769141762316042241>";

    // const embed = new MessageEmbed()
    //     .setColor('#00ff16')
    //     .setTitle("Un serveur vient d'ajouter YZZY")
    //     .setThumbnail(guild.iconURL())
    //     .addField('Nom du serveur:', guild.name)
    //     .addField('Owner du serveur:', guild.owner)
    //     .addField('Nombre de membre:', guild.memberCount)
    //     .setFooter(`Ajout du bot || ${client.guilds.cache.size.toString()} serveurs`, client.user.displayAvatarURL())
    //     .setTimestamp();
    const embed = new MessageEmbed()
        .setColor('#00ff16')
        .setTitle("Un serveur vient d'ajouter YZZY")
        .setThumbnail(guild.bannerURL())
        .setDescription(`${couronne} **Serveur:** ${guild.name}\n
            ${couronne} **Créateur:** ${guild.owner}\n
            ${user} **Membres:** ${guild.memberCount}\n
            ${hashtag} **Salons:** ${client.channels.cache.size.toString()}\n
            ${id} **Identifiants:** ${guild.id}
        `)
        .setFooter(`Ajout du bot || ${client.guilds.cache.size.toString()} serveurs`, client.user.displayAvatarURL())
        .setTimestamp();

    client.statusHook.send(embed);

    await client.createGuild(newGuild);
};

// https://discord.com/api/oauth2/authorize?client_id=720256732630351912&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&scope=bot