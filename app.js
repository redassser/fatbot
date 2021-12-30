const Discord = require("discord.js");
const client = new Discord.Client({
    intents:[
        Discord.Intents.FLAGS.GUILDS, //FRAMEWORK
        Discord.Intents.FLAGS.GUILD_MESSAGES, //FRAMEWORK
        Discord.Intents.FLAGS.GUILD_VOICE_STATES, //AUTOVC
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS //AUTOROLE
    ]
});
client.config = require("./assets/config.json")
const fs = require("fs");
const Enmap = require('enmap');
require('dotenv').config();

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});
  
client.commands = new Enmap();
  
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
client.login(process.env.TOKEN);