exports.run = (client,message,array) => {
    const Discord = require("discord.js");
    const pfpEmbed = new Discord.MessageEmbed()
    const person = (message.mentions.members.first()===undefined) ? message.member : message.mentions.members.first();
    person.user.fetch().then(user => {
        const member = person;
        pfpEmbed
            .setFooter("Account created on ")
            .setColor(member.displayColor)
            .setDescription("Username: "+user.username+"\nJoined on: "+member.joinedAt)
            .setTitle(member.displayName+"'s Profile")
            .setTimestamp(user.createdAt)
            .setThumbnail(user.avatarURL({format:"png",size:512,dynamic:true}))
            .setImage(user.bannerURL({format:"png",size:512,dynamic:true}))
        message.channel.send({embeds:[pfpEmbed]})
    }).catch()
}
exports.desc = "Grabs your profile, or the user's profile"
exports.inp = ["{user ping}"]