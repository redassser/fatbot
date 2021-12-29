module.exports = (client,message,array) => {
    //FRAMEWORK
    console.log("ready")
    client.user.setPresence({ 
        activity: { 
            name: "botsbypie",
            type: "WATCHING" 
        }, 
        status: 'online' 
    });
    //FRAMEWORK
    //AUTOROLE
    client.channels.cache
        .filter(channel => (channel.name === "autorole"&&channel.type === "GUILD_TEXT"))
        .forEach(channel => {
            channel.messages.fetch({limit:20})
        });
    //AUTOROLE
}