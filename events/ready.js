module.exports = (client,message,array) => {
    console.log("Fight!");
    client.user.setPresence({ game: { name: '.smash' }, status: 'online' });
}