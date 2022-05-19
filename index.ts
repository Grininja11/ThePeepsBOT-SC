//Discord / NODE Const values.
const Discord = require('discord.js')
const client = new Discord.Client({ intents: 14023 });
const { Intents, Collection } = require("discord.js");
const fs = require("fs");

//Miscellaneous Const values.
const prefix = "/"

//Other values.
client.commands = new Collection();

//Require values
require("dotenv").config();

//SlashCommand Values.
const { userMention } = require("@discordjs/builders");
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const { version } = require("os");
const commands = [];
const CommandFolder = fs.readdirSync("./Commands");

//SlashCommands -> Command Handler.
client.commands = new Collection();

for (const folder of CommandFolder) {
    const CommandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.ts'));
    for (const file of CommandFiles) {
        const command = require(`./Commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on("error", console.error);

//Bot logger.
client.once("ready", () => {
    console.log('ThePeepsBOT is ALIVE!!!')
    
    // Activity set.
    client.user.setActivity('Coding myself!', { type: 'PLAYING'});

    //SlashCommand Handler.
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(process.env.BOT_TOKEN);
    (async () => {
        try {
            if (process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Successfully loaded Commands GLOBALY!")
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.PEEPS_SERVER_ID), {
                    body: commands
                });
                console.log("Successfully loaded Commands LOCALLY!")
            }
        } catch (err) {
            if (err) console.error(err);
        }
    })();
});

//SlashCommand Loader EXT.
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch(err) {
        if (err) console.error(err);

        await interaction.reply({
            content:"For some reason, I wasn't able to execute this Command, try executing this Command again and if it does't work, Email the Dev! (**/devmail**)",
            ephemeral: true,
        });
    }
});

//Command Filter
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.startsWith(prefix)) return;
});

//Commands.

//Text Commands.
client.on("messageCreate", (message) => {
 //Hello Command.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === `${prefix}hello`) {
        message.channel.send("Hello there!")
    }
 //Bye Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}bye`) {
        message.channel.send(`Goodbye!`)
    }
//Bing-Bong Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}bingbong`) {
        message.channel.send("Bing Bong here come's my DING DONG!")
    }
 //Speak Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}speak`) {
        message.channel.send("**FUCK**")
    }
})

//Help Commands.

//Help Command.
client.on("messageCreate", (message) => {
//(Main)Help Command. 
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === `${prefix}help`) {
        message.channel.send("Hello! I've seen you just used the **/help** Command, this Help List isn't fully finished at the moment but here are some Commands one can use!")
        message.channel.send("**/bingbong** | **/speak** | **/bye** | **hello**")
        message.channel.send("Bot related Commands: **/botinfo** | **/scode** | **/patchnotes**")
        message.channel.send("Other /help Commands: **/devlist** | **/peepshelp** | **/modhelp**")
    }
//ModHelp Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}modhelp`) {
    message.channel.send("*Being worked on!*")
    }
//PeepsHelp Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}peepshelp`) {
        message.channel.send("Here are some Peeps Commands! (All Peeps Commands starts with **/tp<Command>**)")
        message.channel.send("**/tpyoutube** | **/tpdiscord** | ** /tptwitter** | **/tpreddit**")
    }
})

//DevCommands.

//Dev Command.
client.on("messageCreate", (message) => {
//DevHelp Command.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === `${prefix}devlist`) {
        message.channel.send("Hello! I've seen you just used the **/devlist** Command.")
        message.channel.send("Some Commands you can use is: **/devmail** | **/devdiscord** | **/devinfo** | **/devnews** | **/subdevupdates**. (This Help list is still being worked on and being expanded on)")
    }
//DevInfo Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}devinfo`) {
        message.channel.send("Hello! I've seen you just used the **/devinfo** Command, my Developer is **Greninja11**, you can find him on *twitch.tv/greninja11_* !")
    }
//DevMail Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}devmail`) {
        message.channel.send("Hello! I've seen you just used the **/devmail** Command, you can Email the Dev at **greninja11devcode@gmail.com**.")
    }
//DevDiscord Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}devdiscord`) {
        message.channel.send("Hello! I've seen you just used the **/devdiscord** Command, you join the Server here: https://discord.gg/SydBqhE")
    }
//DevNews Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}devnews`) {
        message.channel.send("CURRENT SOURCE CODE IS NOW PUBLIC!!! (**/scode**)")
    }
})

//Miscellaneous Commands.

//Bot related Commands.
client.on("messageCreate", (message) => {
 //BotInfo Command.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === `${prefix}botinfo`) {
        message.channel.send("HELLO! My name is ThePeepsBOT!")
        message.channel.send("Im am a Bot made by Greninja11 for **The Peeps** and FANS! (*You can add me to your own Discord Server after Gren is fully done coding me!*)")
        message.channel.send("My current prefix is **/**, to see my Source Code use **/scode**!")
        message.channel.send("To know more about my Developer use **/devinfo**!")
    }
 //PatchNotes Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}patchnotes`) {
        message.channel.send("PatchNotes as of April-17-2022")
        message.channel.send("-Not really a PatchNote, but the Current SC is public! (**/scode**)")
    }
//SubDevUpdates Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}subdevupdates`) {
        message.channel.send("Hello! I've seen that you just used the **/subdevupdates** Command, We plan on adding a Subscription service later down the line, to be up-to-date of this Command, you can use **/patchnotes** or **/devnews**!")
    }
})

//SCode Command.
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content === `${prefix}scode`) {
        message.channel.send("Im am not fully coded yet but here is my current Source Code! https://github.com/Grininja11/ThePeepsBOT-SC")
    }
})

//Other
//ThePeepsBOT login.
client.login(process.env.BOT_TOKEN)