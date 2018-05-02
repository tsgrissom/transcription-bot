const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const yaml = require('js-yaml');
const PastebinAPI = require('pastebin-js');

let pastebinKey = '';
let botKey = '';
let pastebin = null;

client.on('message', message => {
    if (message.content.toLowerCase() === '-transcript') {
        message.channel.fetchMessages()
            .then(messages => {
                let text = "";

                for (let [key, value] of messages) {
                    text += `${value.author.tag}: ${value.content}\n`;
                }

                console.log(text);

                pastebin.createPaste({
                        text: text,
                        title: "Transcript",
                        format: null,
                        privacy: 1
                    })
                    .then(data => {
                        console.log(`Created paste: ${data}`);

                        message.author.send(`Transcript: ${data}`)
                            .then(() => console.log(`Sent user "${message.author.tag}" transcript.`))
                            .catch((err) => {
                                console.log(`Could not PM transcript, falling back to message in channel: ${err}`);
                                message.reply(data).fail((err) => console.log(`Uh oh! Something went wrong: ${err}`));
                            });
                    })
                    .fail(err => {
                        console.log(`Failed to create paste: ${err}`);
                    });
            })
            .catch(err => {
                console.log(`Failed to fetch messages: ${err}`);
            });
    }
});

try {
    config = yaml.safeLoad(fs.readFileSync('configuration.yml', 'utf8'));

    if (typeof config === 'undefined') {
        console.log('You must set up a configuration.yml!');

        process.exit(1);
    }

    pastebinKey = config.pastebinKey;
    botKey = config.botKey;
} catch (e) {
    console.log(e);
}

client.login(config.botKey)
    .then(() => {
        pastebin = new PastebinAPI(pastebinKey);

        console.log('Bot ready!')
    });