const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
require("./util/functions")(client);
client.config = require("./config");
client.mongoose = require("./util/mongoose");
client.radioURL = require('./radioURL');
client.queue = new Map();
["commands", "cooldowns", "musicPlayer"].forEach(x => client[x] = new Collection());

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
}); 

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(client.config.TOKEN);