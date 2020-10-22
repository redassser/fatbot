exports.run = (client,message,array) => {
    const Discord = require("discord.js");
    var gameSettings = {
        name: "blackjack",
        max: 4,
        dmResponses: ["accept","decline"],
        gameResponses: ["hit","stand"]
    }
    const dmfilter = (msg) => {
        return gameSettings.dmResponses.includes(msg.content.toLowerCase());
    };
    const gamefilter = (msg) => {
        return gameSettings.gameResponses.includes(msg.content.toLowerCase());
    };

    var names = message.mentions.members ? message.mentions.members.array() : [];
    if(names.length>(gameSettings.max-1)) {message.channel.send(`Too many people! Maximum of ${gameSettings.max}, including yourself.`);return;}
    var people = [];
    for(var person of names) {
        if(person.user.id === message.author.id) {message.channel.send("Please do not include yourself in the pings!");return;}
        if(person.user.bot) {message.channel.send("Please do not include a bot in the pings!");return;}
        people.push(person.user)
    }
    people.push(message.author);

    var playerNames = [];
    for(var person of people) {playerNames.push(person.username);}

    function DMinvite(player) {
        return new Promise(function(resolve,reject){ 
        player.send(`You've been invited to play ${gameSettings.name} with ${playerNames.join(", ")}!\nRespond with \`\`accept\`\` or \`\`decline\`\`.`)
        .catch(()=>{message.channel.send(`Sorry, but user ${player.username} is not accepting DMs, and therefore cannot play!`);return;})
        .then(msg=>{
            msg.channel.awaitMessages(dmfilter, {max:1,time:300000,errors:["time"]})
            .then(collected=>{
                switch(collected.first().content.toLowerCase()) {
                    case "accept":
                        msg.channel.send("Thank you for accepting! The game should begin shortly.")
                        resolve("accept");
                        break;
                    case "decline":
                        msg.channel.send("Noted.")
                        message.channel.send(`Sorry, but user ${player.username} has declined the invitation to play.`);
                        reject("decline");
                        return;
                }
            })
            .catch(() => {message.channel.send(`User ${player.username} did not respond after 5 minutes, and therefore cannot play.`);return;});
        })
        })    
    }
    //Sort of modular invitation system over! Now to check
    var promises = []
    for(let person of people){
        promises.push(DMinvite(person))
    }
    var hands = new Object();
    Promise.all(promises)
    .then(() => {
        beginGame()
        var gamepromises = []
        for(let person of people){
            gamepromises.push(HorS(person))
        }
        Promise.all(gamepromises).then((h)=>{
            let finalembed = new Discord.MessageEmbed()
            .setAuthor("Blackjack","https://i.imgur.com/XUyyqSy.png")
            .setThumbnail("https://i.imgur.com/FtRVdOS.png")
            .setTitle("Hands")
            .addField("Dealer's hand total is "+checkTotal(client.user.id),hands[client.user.id]);
            for(let person of people) {
                finalembed.addField(`${person.username}'s hand total is `+checkTotal(person.id),hands[person.id]);
            }
            for(let person of people) {
                person.send(finalembed).catch(console.error);
            }
        })
    }).catch(error=>{/*Get out of my console you brick for brain*/});
    
    function beginGame() {
        const deck = client.deck;
        //first players and dealer must be given cards 
        const dealerhand = genCards(2);
        hands[client.user.id] = dealerhand;
        hands["dealer"] = [dealerhand[0],"Hidden card"]
        for(let person of people) {
            hands[person.id] = genCards(2);
        }
        //all hands are shown
        let cardembed = new Discord.MessageEmbed()
        .setAuthor("Blackjack","https://i.imgur.com/XUyyqSy.png")
        .setThumbnail("https://i.imgur.com/FtRVdOS.png")
        .setTitle("Hands")
        .addField("Dealer's hand",hands["dealer"]);
        for(let person of people) {
            cardembed.addField(`${person.username}'s hand`,hands[person.id]);
        }
        for(let person of people) {
            person.send(cardembed).catch(console.error);
        }
        
        if(checkTotal(client.user.id)===21) {WIN21(client.user);return;} 
        else {
            for(let person of people) {
                if(checkTotal(person.id)===21) {WIN21(person);return;} 
            }
        }   
    }
    function checkTotal(id) {
        var total = 0;
        for(let card of hands[id]) {
            if(isNaN(card[0])) {total = (card[0]==="A") ? total+11 : total+10}
            else {total = total+card[0]}
        }
        return total;
    }
    function WIN21(winner) {
        let winembed = new Discord.MessageEmbed()
        if (winner.id===client.user.id) {
            winembed
            .setAuthor("Dealer","https://i.imgur.com/XUyyqSy.png")
            .setThumbnail("https://i.imgur.com/FtRVdOS.png")
            .setTitle("Dealer has won by getting 21!")
            .addField("Dealer's hand",hands[winner.id]);
        } else {
            winembed
            .setAuthor(winner.username,winner.avatarURL())
            .setThumbnail("https://i.imgur.com/FtRVdOS.png")
            .setTitle(winner.username+" has won by getting 21!")
            .addField(winner.username+"'s hand",hands[winner.id]);
        }
        for(let person of people) {
            person.send(winembed);
        }
        return;
    }
    function genCards(amount) {
        var cards = []
        if(amount===1) {cards = client.deck[Math.floor(Math.random()*52)]}
        else {
            for(let x=0;x<amount;x++){
                cards.push(client.deck[Math.floor(Math.random()*52)])
            }
        }
        return cards;
    }
    function HorS(player) {
        return new Promise(function(resolve){ 
        player.send(`It's your turn!\nRespond with \`\`hit\`\` or \`\`stand\`\`.`)
        .catch(()=>{message.channel.send(`Sorry, but user ${player.username} is not accepting DMs, and therefore cannot play!`);return;})
        .then(msg=>{
            const coll = msg.channel.createMessageCollector(gamefilter)
            coll.on("collect", m=>{
                let hsembed = new Discord.MessageEmbed()
                console.log(m.content)
                switch(m.content) {
                    case "hit":
                        hands[player.id].push(genCards(1))
                        hsembed
                        .setAuthor(player.username,player.avatarURL())
                        .setThumbnail("https://i.imgur.com/FtRVdOS.png")
                        .setTitle("Hand total is now "+checkTotal(player.id))
                        .addField(player.username+"'s hand",hands[player.id]);
                        message.channel.send(hsembed)
                        if(checkTotal(player.id)>21){coll.stop(); resolve(player.username+"l")}
                        else if(checkTotal(player.id)===21) {coll.stop(); resolve(player.username+"w")}
                        break;
                    case "stand":
                        hsembed
                        .setAuthor(player.username,player.avatarURL())
                        .setThumbnail("https://i.imgur.com/FtRVdOS.png")
                        .setTitle("Hand total is "+checkTotal(player.id))
                        .addField(player.username+"'s hand",hands[player.id]);
                        message.channel.send(hsembed)
                        coll.stop();
                        resolve(player.username+"s");
                        break;
                }
            })
            coll.on("end",()=>{
                player.send("Your turn is now over!")
            })
        })
    })
    }
}