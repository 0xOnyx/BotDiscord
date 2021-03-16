const { ErelaClient } = require("erela.js");
const { MessageEmbed, WebhookClient } = require("discord.js");
const chalk = require('chalk');

module.exports = async client => {
  client.appInfo = await client.fetchApplication();
    setInterval(async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);

  // const embedR = new MessageEmbed()
  // .setTitle(`<:reglage:730384004125294662> __${client.user.tag} est en ligne !__ <a:checkgif:730888706440953899>`)
  // .setDescription(`**J'ai demarrer dans :\n ${client.guilds.cache.size.toString()} serveurs, avec ${client.guilds.cache.reduce((a, g) => a + g.memberCount,0)} membres**`)
  // .setFooter(`YZZY | Démarrage`)
  // .setTimestamp();

    console.log(chalk.red(`Logged in as `) + chalk.green(`${client.user.tag}`) + chalk.red(`!`));
    // client.statusHook.send(embedR);

    let activities = [`Prefix : %`, "Createur : LACOSTAR91#3705", 'Version : 2.0.0', `${client.guilds.cache.size.toString()} serveurs. ${client.guilds.cache.reduce((a, g) => a + g.memberCount,0)} membres`];
    
    setInterval(() => client.user.setPresence({ activity: { name: `${activities [Math.floor(Math.random() * activities.length)]}`, type: 'PLAYING' }, status: 'dnd' }), 120000);
    
    
    //Musique

    // client.music = new ErelaClient(client, [{
    //   host: client.config.LAVALINK_HOST,
    //   port: client.config.LAVALINK_PORT,
    //   password: client.config.LAVALINK_PASSWORD
    // }]);

    // client.music.on("nodeConnect", node => console.log("Music connecté !"));
    // client.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    // client.music.on("trackStart", (player, track) => player.textChannel.send(`Musique en train de jouer: ${track.title}`));
    // client.music.on("queueEnd", player => {
    //     player.textChannel.send("La queue est terminée, merci d'avoir utilisé YZZY ! Déconnexion...")
    //     client.music.players.destroy(player.guild.id);
    // });
  }