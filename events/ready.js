module.exports = (client,message,array) => {
    console.log("Launched");
    client.user.setPresence({ game: { name: '.help' }, status: 'online' });
}