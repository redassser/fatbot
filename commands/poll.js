exports.run = (client,message,array) => {
    //requirements
      const Discord = require("discord.js");
    //exceptions
      if (array.length < 1) {message.channel.send("``.poll [question]``");return};
    //variables
      var question = array.join(" ");
      let pollEmbed = new Discord.MessageEmbed() 
        .setColor("#3f9cc6")
        .setTitle(question)
        .setDescription("React with ❌ or ✅ to vote")
        .setFooter("Poll will close in 1 minute")
    //statements
      function g(msg) {
        msg.react("✅");msg.react("❌")
        setTimeout(function () {
          var noCount = msg.reactions.cache.find(u => u._emoji.name === '❌').count; var yesCount = msg.reactions.cache.find(u => u._emoji.name === '✅').count;
          if (noCount>yesCount) var w = ["#B00B03",'❌',noCount-1]
          else if (yesCount>noCount) var w = ["#19A410",'✅',yesCount-1]
          else var w = ["GREY","Neither",yesCount-1]
          let pollAfterEmbed = new Discord.MessageEmbed() 
            .setColor(w[0])
            .setTitle(question)
            .setDescription(w[1]+" won with "+w[2]+" reaction(s)!")
            .setFooter("The poll has closed")
          msg.edit(pollAfterEmbed)
        }, 60000)
      }
      message.channel.send(pollEmbed).then((msg) => {g(msg);});
  }