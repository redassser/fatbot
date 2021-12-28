exports.run = (client,message,array) => {
    const Discord = require("discord.js");  
    const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Available commands")
        .setColor("RANDOM")
        .setFooter("{optional} [required]")
    client.commands.forEach((cmd,name) => {
        helpEmbed.addField(`.${name} ${cmd.inp.join(" ")}`,cmd.desc)
    })
    message.channel.send({embeds:[helpEmbed]})
}
exports.desc = "Lists all commands, you just used it."
exports.inp = [""]