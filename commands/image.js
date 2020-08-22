exports.run = (client,message,array) => {
    //requirements
      const Discord = require("discord.js");  
      const jimp = require("jimp");
    //exceptions
      if (array.length < 1) {message.channel.send("``.image [text]``");return};
    //variables
      var text = array.join(" ");
    /*
      new jimp(80, 30, async(err, image) => {
          let text = await jimpFONT.CreateFont("ComicSans", 80, 30, "https://cdn.glitch.com/1d62bf89-900d-4318-a623-06a7fd79c1a9%2FUndertaleSans.ttf", 20, "#FFFFFF"); //Text, width, height, path, size, HexaColor
          image.composite(text, 0, 0);
          image.getBuffer(jimp.MIME_PNG,  async (err, buffer) => {
              if (err) console.log(err);
              return buffer; 
          });
  });
  */
    //statements
    //"https://cdn.glitch.com/1d62bf89-900d-4318-a623-06a7fd79c1a9%2Ffont.fnt"
      async function g() {
        if (message.author.id==="265953906951979019") {
          var ff = jimp.FONT_SANS_64_WHITE
        } else {
          var ff = jimp.FONT_SANS_32_WHITE
        }
        let img = await jimp.read("https://cdn.glitch.com/1d62bf89-900d-4318-a623-06a7fd79c1a9%2FrfwCm66.jpg")
        let font = await jimp.loadFont(ff).then(font=> {
          img.print(
            font,
            135,
            40,
            {
              text:text
            },
            400,
            200
          );
        });
        img.write("sansSpeaks.jpg")
        message.channel.send("",{ files: ["sansSpeaks.jpg"]})
      }
    g()
  }