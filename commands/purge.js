exports.run = (client,message,array) => {
    if (!message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES")) {message.channel.send("Sorry! Mods only");return;}
    if (array.length < 1) {message.channel.send("``.purge [number between 1 and 99]``");return;}
    var numb = parseInt(array.shift());
    if (!Number.isInteger(numb)) {message.channel.send("``.purge [INTEGER between 1 and 99]``");return;}
    if (numb>99||numb<1) {message.channel.send("``.purge [number BETWEEN 1 and 99]``");return;}
    message.channel.bulkDelete(numb+1)
    .then(messages => message.channel.send(`${messages.size-1} messages be gone`))
    .catch(console.error);
}