exports.run = (client,message,array) => {
    const Discord = require("discord.js");

    if(array.length<2) {message.channel.send("You didn't ask a quesiton and/or give a duration!");return;}
    var time = array.shift(); var letter = time.slice(-1); var length;
    if(parseInt(time, 10)!=NaN) {length=parseInt(time,10)} else {message.channel.send("You did not provide a correct time.");return;}
    switch(letter) {
        case "s":
            if(length>86400) {message.channel.send("Poll cannot last more than 24 hours.");return;}
            length *= 1000;
            break;
        case "m":
            if(length>1440) {message.channel.send("Poll cannot last more than 24 hours.");return;}
            length *= 60000;
            break;
        case "h":
            if(length>24) {message.channel.send("Poll cannot last more than 24 hours");return;}
            length *= (60000 * 60);
            break;
        default:
            message.channel.send("Please use h, m, or s");
            return;
    }

    const pollEmbed = new Discord.MessageEmbed()
        .setThumbnail("https://i.imgur.com/F9Xd4rg.png")
        .setColor("RANDOM")
        .setFooter("Poll will run for "+time+".")
        .setDescription(array.join(" "))
        .setTitle("True or False?")
        .setFields(
            {"name":"🟩","value":"0","inline":true},
            {"name":"🟥","value":"0","inline":true}
        );
    const butt1 = new Discord.MessageButton()
        .setCustomId("t")
        .setLabel("TRUE")
        .setStyle("SUCCESS")
        .setEmoji("✔️");
    const butt2 = new Discord.MessageButton()
        .setCustomId("f")
        .setLabel("FALSE")
        .setStyle("DANGER")
        .setEmoji("✖️");
    const pollRow = new Discord.MessageActionRow()
        .addComponents(butt1,butt2);
    message.channel.send({embeds:[pollEmbed], components:[pollRow]})
        .then(sent=>{
            const collector = sent.createMessageComponentCollector({componentType: "BUTTON", time:length})
            var t = []; var f = [];
            collector.on("collect", o => {
                if(o.customId==="t" && !t.includes(o.user.id)) {t.unshift(o.user.id);f=f.filter(id=>id!=o.user.id);}
                else if(o.customId==="f" && !f.includes(o.user.id)) {f.unshift(o.user.id);t=t.filter(id=>id!=o.user.id);}
                else {o.reply({content:"You already voted for that one!", ephemeral:true});return;}
                pollEmbed.setFields(
                    {"name":"🟩","value":`${t.length}`,"inline":true},
                    {"name":"🟥","value":`${f.length}`,"inline":true}
                );
                o.update({embeds:[pollEmbed]});
            })
            collector.on("end", coll=>{
                const tsize = coll.filter(g=>g.customId==="t").size; 
                const fsize = coll.filter(g=>g.customId==="f").size
                var img; var result;
                if (tsize>fsize) {img="https://i.imgur.com/jcG5WxV.png";result="GREEN";}
                else if (fsize>tsize) {img="https://i.imgur.com/RMOIWqy.png";result="RED";}
                else {img="https://i.imgur.com/V4Tmzde.png"; result="BLACK"}
                butt1.setDisabled();butt2.setDisabled();
                const disRow = new Discord.MessageActionRow()
                    .addComponents(butt1,butt2)
                pollEmbed
                    .setThumbnail(img)
                    .setColor(result);
                sent.edit({embeds:[pollEmbed], components:[disRow]})
            })
        })
}
exports.desc = "Opens a True or False poll! Duration exammples: 5m for 5 minutes, 10h for 10 hours."
exports.inp = ["[duration] [question]"]