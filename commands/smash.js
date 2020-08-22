exports.run = (client,message,array) => {
    //requirements
      const Discord = require("discord.js");
    //exceptions
      if (message.author.bot) return;
    //variables
      let smashEmbed = new Discord.MessageEmbed() 
        .setColor("#3f9cc6")
        .setTitle("This is RenegadeBot for the Renegade Roundup discord")
        .setDescription("Funny gamin' bot")
        .addField("Ping `@fat` or `@quote`","Buffalo Chicken Dippers")
        .addField("`.say {#channel} [Say anything you want]`","Repeats whatever you want in the mentioned channel.")
        .addField("`.poll [question]`","Creates a poll that ends in one minute, and is responded to by reacting to a message")
        .addField("The Hotel","I'm sure you know what this is.")
    //statements
      message.channel.send(smashEmbed);
  }