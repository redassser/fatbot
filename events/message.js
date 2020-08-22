module.exports = (client, message) => {
  //bot exclusion
    if (message.author.bot) return;
    const Discord = require("discord.js")
    var list = client.phrases.list
  //crab distribution
    if (message.content.indexOf("<:destroy:650742617373540412>") != -1) {
      message.channel.send("<:destroy:650742617373540412> <@&651599125531328552> <:destroy:650742617373540412>");
    }
  //image consolidation
   if(message.channel.id==="690241406630887440") {
     if(!message.attachments.first()) {
       message.delete();
     }
   }
  //command fondling
    if (message.content.indexOf(".") !== 0) return;
    const array = message.content.slice(1).trim().split(/ +/g);
    const command = array.shift().toLowerCase();
  
    const cmd = client.commands.get(command);
    if (!cmd) return;
  
    cmd.run(client, message, array);
  };