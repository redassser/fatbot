exports.run = (client,message,array) => {
    const Discord = require("discord.js");  
    var map = message.guild.channels.cache
    for (let a of map.keys()) {
      if(map.get(a).messages===undefined) {
        map.delete(a)
      }
    }
    async function dothis() {
      var fullcount = 0;
      for (let b of map.keys()) {
        map.get(b).messages.fetch().then(msgmap =>
          msgmap.each(msg => fullcount += (msg.content.match(/:crushed:/g)||[]).length)
        )
      }
      return fullcount
    }
    dothis().then(se=>message.channel.send(se));
  }