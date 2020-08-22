exports.run = (client,message,array) => {
    //requirements
      const Discord = require("discord.js");
    //exceptions
      if (array.length < 1) {message.channel.send("``.pfp {@user}``");return};
      if (message.mentions.members.first() === undefined) {message.channel.send("Please use a valid user mention!");return;}
    //variables
      var userID = array.shift().replace(/\D/g,'')
    //statements
      if (userID != message.mentions.members.first().id) {message.channel.send("Please use a valid user mention!");return;}
      message.channel.send(message.mentions.members.first().user.avatarURL());
  }