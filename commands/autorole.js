exports.run = (client,message,array) => {
    const Discord = require("discord.js");  
    const vcEmbed = new Discord.MessageEmbed()
    if(!message.member.permissions.has("ADMINISTRATOR")) {
        message.channel.send("Sorry! Admins only.")
        return;
    }
    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
        message.channel.send("Sorry! I don't have the *manage channels* permission.");
        return;
    }
    if (message.guild.channels.cache.find(h=>h.type==="GUILD_TEXT"&&h.name==="autorole")) {
        message.channel.send("Sorry! You already have an autorole channel.");
        return;
    }
    message.guild.channels.create("autorole", {
        type: "GUILD_TEXT",
        position: 0
    }).then(()=>{
        vcEmbed
            .setTitle("autorole channel created!")
            .setColor("RANDOM")
            .setDescription("You can move the channel anywhere.")
        message.channel.send({embeds:[vcEmbed]})
    })
}
exports.desc = "Creates the autorole channel."
exports.inp = [""]