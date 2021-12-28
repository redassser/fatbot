module.exports = (client, reaction, user) => {
    //AUTOROLE
    if(reaction.message.channel.name!="autorole") return;
    if(!reaction.message.guild.me.permissions.has("MANAGE_ROLES")) return;
    var emoteObject = {};
    const useLines = reaction.message.content
        .split("\n")
        .filter(line => line.trim().startsWith(">"))
        .forEach(line => {
            const halves = line.replaceAll(/[\s<>]/g,"").split(":");
            const roleId = halves.pop().replace("@&","");
            const emoteId = halves.pop();
            emoteObject[emoteId] = roleId;
        });
    const reactionId = (reaction.emoji.id == null) ? reaction.emoji.name : reaction.emoji.id
    if(emoteObject[reactionId]!=(undefined)) {
        reaction.message.guild.roles.fetch(emoteObject[reactionId]).then(role=> {
            if(role!=null) {
                reaction.message.guild.members.fetch({user, force:true}).then(member=> {
                    if(role.position >= reaction.message.guild.me.roles.highest.position) return;
                    member.roles.remove(role);
                });
            }
        })
    }
    //AUTOROLE
}