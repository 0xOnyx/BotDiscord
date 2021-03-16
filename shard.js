const config = require("./config.js");
const { ShardingManager } = require('discord.js');

const shard = new ShardingManager('./main.js', { token: config.TOKEN });

shard.spawn(2);