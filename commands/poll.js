exports.run = (client,message,array) => {
    const Discord = require("discord.js");
    const PollThumbnail = new Discord.MessageAttachment("./assets/PollThumbnail.png", "PollThumbnail.png");
    const tThumbnail = new Discord.MessageAttachment("./assets/tThumbnail.png", "tThumbnail.png");
    const fThumbnail = new Discord.MessageAttachment("./assets/fThumbnail.png", "fThumbnail.png");
    const noThumbnail = new Discord.MessageAttachment("./assets/noThumbnail.png", "noThumbnail.png");

    if(array.length===0) {message.channel.send("You didn't ask a quesiton!");return;}
    const question = array.join(" ");
    const pollEmbed = new Discord.MessageEmbed()
        .setThumbnail("attachment://PollThumbnail.png")
        .setColor("RANDOM")
    function torf() { //function for true or false, plan on more likely not we'll see
        pollEmbed
            .setFooter("Poll will run for 5 minutes.")
            .setDescription(question)
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
            .addComponents(
                butt1,butt2
            )
        message.channel.send({embeds:[pollEmbed], components:[pollRow], files: ["./assets/PollThumbnail.png"]})
            .then(sent=>{
                const collector = sent.createMessageComponentCollector({componentType: "BUTTON", time:300000})
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
                    var file; var result;
                    if (tsize>fsize) {file="tThumbnail.png";result="GREEN";}
                    else if (fsize>tsize) {file="fThumbnail.png";result="RED";}
                    else {file="noThumbnail.png"; result="BLACK"}
                    butt1.setDisabled();butt2.setDisabled();
                    const disRow = new Discord.MessageActionRow()
                        .addComponents(
                            butt1,butt2
                        )
                    pollEmbed
                        .setAuthor("False","attachment://PollThumbnail.png")
                        .setThumbnail(`attachment://${file}`)
                        .setColor(result);
                    sent.edit({embeds:[pollEmbed],files:[`./assets/${file}`], components:[disRow]})
                })
            })
    }
    torf()
}
exports.desc = "Opens a True or False poll for 5 minutes!"
exports.inp = ["[question]"]