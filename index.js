const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('4f8af4062138d96962bdecae16ca9d9b');

client.on('message', message => {
    if (message.content.toLowerCase() === '-transcript') {
    message.channel.fetchMessages()
        .then(messages => {
        let text = "";

    for (let [key, value] of messages) {
        let createdAt = convertTimestamp(value.createdTimestamp);

        text += `${value.author.tag}: ${value.content}\n`;
    }

    pastebin.createPaste(text, "Transcript")
        .then(data => {
        console.log(`Created paste: ${data}`);

    message.author.send(`Transcript: ${data}`).then(() => console.log(`Sent user "${message.author.tag}" transcript.`)).catch((err) => {
        console.log('Could not PM transcript, falling back to message in channel');

    message.reply(data)
        .fail((err) => console.log(`Uh oh! Something went wrong: ${err}`));
});
})
.fail(err => console.log(err));
})
.catch(console.error);

    if (message.deletable) {
        message.delete();
    } else {
        console.log('Could not delete message. The bot needs permission to do this.');
    }
}
});

client.login('NDQxMjU4OTU0MTI3OTY2MjE5.Dctp8g.HSIW0dVmSZ4jKSVzGS2tbDdJOuU');