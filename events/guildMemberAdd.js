module.exports = (client, member) => {
    //AUTOROLE
    const regex = /{\d+}/g;
    var first = member.guild.channels.cache.filter(chan=>(
        chan.name==="autorole"&&regex.test(chan.topic)
    )).first();
    if(!first) return;
    const roleID = first.topic.match(regex)[0].replaceAll(/\{|\}/g,"");
    member.guild.roles.fetch(roleID).then(role=> {
        if(role==null) return;
        member.roles.add(role);
    }).catch(()=>{return;});
    //AUTOROLE
}