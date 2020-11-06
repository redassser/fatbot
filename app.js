const express = require('express');
const Enmap = require('enmap');
require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
client.deck = require("./config/cards.json").deck;
client.phrases = require("./config/MichaelPhrases.json");
client.vc = require("./config/vcnames.json").auto;
const fs = require("fs");
const prefix = ".";

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
client.login(process.env.TOKEN);