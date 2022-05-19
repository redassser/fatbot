const Discord = require("discord.js");
const client = new Discord.Client({
    intents:[
        Discord.Intents.FLAGS.GUILDS, //FRAMEWORK
        Discord.Intents.FLAGS.GUILD_MESSAGES, //FRAMEWORK
        Discord.Intents.FLAGS.GUILD_VOICE_STATES, //AUTOVC
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, //AUTOROLE
        Discord.Intents.FLAGS.GUILD_MEMBERS //AUTOROLE {privileged}
    ]
});
const { Autohook } = require('@degen/twitter-autohook');

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

(async h =>{
    const webhook = new Autohook({
        token: process.env.twitTOKEN,
        token_secret: process.env.twitSECRET,
        consumer_key: process.env.twitCKEY,
        consumer_secret: process.env.twitCSECRET,
        ngrok_secret: process.env.ngSECRET,
        env: process.env.twitENV
    });
    await webhook.removeWebhooks();
    await webhook.startFastifyServer();
    await webhook.setNGrokWebhook();
    await webhook.subscribe({
        oauth_token: process.env.twitTOKEN,
        oauth_token_secret: process.env.twitSECRET,
    })
    webhook.on('event', (req, rep) => {
        tweet = req.body.favorite_events[0].favorited_status;
        client.guilds.fetch("631317140649279488").then(gui=> {
            gui.channels.fetch("847918477931184148").then(chane => {
                const helpEmbed = new Discord.MessageEmbed()
                    .setAuthor(tweet.user.name+" (@"+tweet.user.screen_name+")", tweet.user.profile_image_url, "https://twitter.com/"+tweet.user.screen_name)
                    .setDescription(tweet.text)
                    .setColor(tweet.user.profile_sidebar_border_color)
                    .addFields(
                        { name: "Likes", value: ''+tweet.favorite_count, inline: true },
                        { name: "Retweets", value: ''+tweet.retweet_count, inline: true },
                        { name: "Comments", value: ''+tweet.reply_count, inline: true }
                    )
                chane.send({embeds:[helpEmbed]})
                if(!tweet.extended_entities) return;
                tweet.extended_entities.media.forEach(image=>{
                    var mes = image.type==="video" ? "Click original tweet for video!" : "";
                    chane.send(mes+"\n"+image.media_url);
                });
            })
        })
    }) 
})();

client.login(process.env.TOKEN);