const { VoiceBroadcast } = require("discord.js");

module.exports = (client, oldmember, newmember) => {
    if(newmember.channel!=null&&newmember.channel.parent.name=="auto-vc") { //if they join
        var chanid = newmember.channel.id
        checkLatest(chanid);
    }
    if(oldmember.channel!=null&&oldmember.channel.parent.name=="auto-vc") { //if they leave
        var chanid = oldmember.channel.id
        checkPast(chanid)
        return;
    }
    function randomName() {
        return client.vc[Math.floor(Math.random() * client.vc.length)];
    }
    function checkLatest(id) {
        var chanarray = []; const parnt = newmember.channel.parent
        parnt.children.each(channel => chanarray.push(channel.id))
        if(chanarray.includes(id)) {
            parnt.guild.channels.create(randomName(),
                {
                    type: "voice",
                    parent: parnt,
                    bitrate: 96000
                }
            ); return;
        }
    }
    function checkPast(id) {
        if(oldmember.channel.members.first()!=undefined) {return;}
        var emptychanarray = []; const parnt = oldmember.channel.parent
        parnt.children.filter(channel => channel.members.first()===undefined)
        .each(channel => emptychanarray.push(channel))
        if(emptychanarray.length>1) {
            //var dead = Math.min.apply(Math,emptychanarray);
            var dead = emptychanarray[0]
            var sad = parnt.guild.channels.cache.find(h=>h.id==dead)
            sad.delete();
        } else if (newmember.channel.parent.name=="auto-vc"&&emptychanarray.length===1) {
            //var dead = Math.min.apply(Math,emptychanarray);
            var dead = emptychanarray[0]
            var sad = parnt.guild.channels.cache.find(h=>h.id==dead)
            sad.delete();
        }
    }
}