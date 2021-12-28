exports.run = (client,message,array) => {
    //requirements
      const Discord = require("discord.js");
    //exceptions
      if (array.length < 2) {message.channel.send("``.say {#channel} [Say whatever afterwards]``");return};
      if (message.author.bot) return;
    //variables
      var channel = array.shift().replace(/\D/g,'');
      var mesage = array.join(" ");
    //statements
      if(channel===null||channel===undefined|| !channel) { //exception
        message.channel.send("``Not a valid Channel``");
      } else if (client.channels.cache.get(channel).toString()) { //statement
        client.channels.cache.get(channel.toString()).send(mesage)
        .catch(()=>{message.channel.send("Something went wrong! I'd guess permissions.")});
      } else { //exception
        message.channel.send("``Not a valid Channel``");
      }
  }
  exports.desc="Repeat your message in another channel."
  exports.inp=["[#channel]","[message]"]