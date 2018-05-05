const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const yaml = require('js-yaml');
const hastebin = require('hastebin-gen');

client.on('message', message => {
    if (message.content.toLowerCase() === '-transcript') {
        message.channel.fetchMessages()
            .then(messages => {
                let text = "";

                for (let [key, value] of messages) {
                    const date = new Date(value.createdTimestamp);
                    let dateString = `${date.getDate()}/${date.getMonth()} ${date.getHours()}h ${date.getMinutes()}m`;

                    text += `${value.author.tag} at ${dateString}: ${value.content}\n`;
                }

                hastebin(text, 'txt').then(data => {
                    console.log(`Created hastebin: ${data}`);

                    message.author.send(`Transcript: ${data}`)
                        .then(() => console.log(`Sent user "${message.author.tag}" transcript.`))
                        .catch((err) => {
                            console.log(`Could not PM transcript, falling back to message in channel: ${err}`);
                            message.reply(data).fail((err) => console.log(`Uh oh! Something went wrong: ${err}`));
                        });
                });
            })
            .catch(err => {
                console.log(`Failed to fetch messages: ${err}`);
            });

        message.delete()
            .then(() => console.log('Deleted message'))
            .catch(err => console.log(`Could not delete message: ${err}`));
    }
});

try {
    config = yaml.safeLoad(fs.readFileSync('configuration.yml', 'utf8'));

    if (typeof config === 'undefined') {
        console.log('You must set up a configuration.yml!');
    } else {
        botKey = config.botKey;

        client.login(botKey).then(() => console.log('Bot ready!'));
    }
} catch (e) {
    console.log(`Could not load configuration.yml, please model yours after configuration.example.yml: ${e}`);
}