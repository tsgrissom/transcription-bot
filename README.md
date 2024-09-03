# TranscriptionBot

> DISCLAIMER: This project's core dependencies, such as discord.js are no longer supported.

Discord bot for transcribing chats which was for a commission from Discord user *Garlic#6573*.

When `-transcript` is entered into a chat, this bot transcribes that chat's entire contents into an unlisted Pastebin post via the Pastebin API.

[![Build Status](https://travis-ci.org/grisstyl/TranscriptionBot.svg?branch=master)](https://travis-ci.org/grisstyl/TranscriptionBot)

## Installation Instructions

1. Download and install [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).
2. Download the zipped file of this project or clone the repository.
3. From Command Prompt change directories to this folder.
4. Perform `npm install`
5. Setup your `configuration.yml` based on the provided `configuration.example.yml`, providing your [Pastebin API key](https://pastebin.com/api) and [Discord bot key](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
6. Perform `npm test` from your Command Prompt. If everything is set up correctly you should see a message that the bot is ready.