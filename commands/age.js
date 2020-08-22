exports.run = (client,message,array) => {
    const Discord = require("discord.js");  
    let ageEmbed = new Discord.MessageEmbed() 
        .setColor("RANDOM")
    var pers;
    if(message.mentions.members.first() === undefined) {pers = message.author}
    else {pers = message.mentions.members.first().user}
    var persage = (Date.now() - pers.createdAt.getTime()) / 1000 / 60 / 60 / 24 / 365
    ageEmbed.setTitle(pers.username+"'s account was created on").setDescription(pers.createdAt.toString()).setFooter("That's about "+persage+" years!")
    message.channel.send(ageEmbed);
  }