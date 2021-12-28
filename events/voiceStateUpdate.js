module.exports = (client, memberPrev, memberNew) => {
    //AUTOVC
    if(!memberNew.guild.me.permissions.has("MANAGE_CHANNELS")) return; 
    const channelNames = client.config.vcnames;
    randomName = () => channelNames[Math.floor(Math.random()*channelNames.length)];
    var channelNew = memberNew.channel; channelPrev = memberPrev.channel

    if(channelNew!=null&&channelNew.parent.name=="autovc") { //if they join
        const parent = channelNew.parent;
        update(parent);
        return;
    }
    if(channelPrev!=null&&channelPrev.parent.name=="autovc") { //if they leave
        const parent = channelPrev.parent;
        update(parent);
        return;
    }
    function update(parent) {
        const emptynum = parent.children
            .filter(channel=>channel.members.first() === undefined)
            .size
        if(emptynum > 1) {
            channelPrev.delete();
        } else if (emptynum === 0) {
            parent.guild.channels.create(randomName(), {
                type: "GUILD_VOICE",
                parent: parent,
                bitrate: 72000
            });
        }
    }
    //AUTOVC
}