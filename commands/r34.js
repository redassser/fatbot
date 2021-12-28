exports.run = (client,message,array) => {
    //exceptions
    if (!message.channel.nsfw) {message.channel.send("This doesn't look like an nsfw channel, ***freak!***"); return;}
    //variables
    const Booru = require("booru");
    const Discord = require("discord.js");
    var blacklist = [];
    var emotes = ['❌', '✅', '🟨','🛑']
    //parse blacklist if there is one
    if(message.channel.parent.name === "Hotel"&& message.channel.name!="reception") {
      blacklist = message.channel.topic.split(":")[3].split("; ")
      blacklist.shift()
    } 
    //check for blacklisted tags
    for (let i=0;i<blacklist.length;i++) {
      if(array.includes(blacklist[i])) {
        message.channel.send("Sorry, but the tag "+blacklist[i]+" is currently blacklisted."); return;
      }
    }
    //statement
    image()

    //the image function itself
    function image() {
    Booru.search('r34',array,{limit:10,random:true})
    .then(post => {
      var id;
      try {var link = post[0].fileUrl} catch(err) {message.channel.send("``No images with chosen tags.``");return}
      var post = post.blacklist(blacklist)
      if (post[0]===undefined) {message.channel.send("We could only retrieve blacklisted images from the tags you used, maybe try something else?")}
       const filter = (reaction, user) => {
          return emotes.includes(reaction.emoji.name) && user.id === message.author.id
        };
      message.channel.send([post[0].fileUrl]).then(msg => {
        for(let emote of emotes) msg.react(emote);
        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected =>{
          const reaction = collected.first();
          switch (reaction.emoji.name) {
            case '❌':
              msg.edit("``Image removed. New one generated.``"); image(); msg.delete({timeout: 4000}); break;
            case '🟨':
              message.channel.send("``Feed stopped.``").then(msg => {msg.delete({timeout: 5000})});break;
            case '✅':
              image(); break;
            case '🛑':
              msg.edit("``Feed aborted.``");msg.delete({timeout: 5000});break;
            default:
              break;
          }
        })
        .catch(() => {message.channel.send('``No response after 60 seconds, feed stopped.``').then(msg => {msg.delete({timeout: 5000})});});
      })
    })
    }
  }
  exports.desc="search r34."
  exports.inp=["[tag]","{more tags}"]