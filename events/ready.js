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
            if(!channel.permissionsFor(channel.guild.me).has("READ_MESSAGE_HISTORY")) return; 
            channel.messages.fetch({limit:20})
        });
    //AUTOROLE
}