const Discord = require('discord.js');
const phxbot = new Discord.Client();
var today = new Date();
var freq, date, time;

function generateRandomRadio() {
    generateDateTime();

    var rand = Math.random() * (512 - 30) + 30;
    var power = Math.pow(10, 1);
    freq = Math.floor(rand * power) / power;
    return freq;
}

function generateDateTime() {
    date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    time = today.getHours() + ":" + today.getMinutes();
    return date, time;
}

function displayMessage(string, msg, command) {
    d = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    t = today.getHours() + ":" + today.getMinutes();

    msg.reply(string)
        .then(console.log("[" + d + " " + t + "] " + command + " par " + msg.member.user.tag + " dans " + msg.channel))
        .catch(console.error);
}

phxbot.on('ready', () => {
    console.log("PHXBot connecté");
});

phxbot.on('message', msg => {
    var command = msg.content;

    if (command === '!newradio') {
        displayMessage("la nouvelle fréquence radio est " + generateRandomRadio(), msg, command);
    }

    if (command === '!radio') {
        if (freq == null)
            displayMessage("aucune fréquence n'est définie, écrit !newradio pour en générer une", msg, command);
        else
            displayMessage("la fréquence radio actuelle est " + freq + " [Création le " + date + " à " + time + "]", msg, command);
    }

    if (command === "!commandes")
        displayMessage("!newradio pour générer une nouvelle fréquence | !radio pour afficher la fréquence actuelle", msg, command);
});

phxbot.login('secret code here');