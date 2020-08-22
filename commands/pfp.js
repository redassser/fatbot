exports.run = (client,message,array) => {
    //requirements
      const Discord = require("discord.js");
    //variables
      var pers;
    //statements
    if(message.mentions.members.first() === undefined) {pers = message.author}
    else {pers = message.mentions.members.first().user}  
    message.channel.send(pers.avatarURL());
  }