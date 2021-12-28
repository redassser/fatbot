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
}