//--Setup--
//++Const values++

//Discord / NODE handlers Const values.
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const fs = require("fs");

//SC Const values
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const { userMention } = require("@discordjs/builders"); 
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const { version } = require("os");
const commands = [];

//Miscellaneous Const values.
const prefix = "/"
const { Client, Intents, Collection } = require("discord.js");
const { channel } = require("diagnostics_channel");
const { start } = require("repl");

//++Require values++
require("dotenv").config();

//SlashCommands (SC)
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

//Console loging for Bot activity (Ready or Not-Ready) and SC loader.
client.once("ready", () => {
    console.log("ThePeepsBOT is ALIVE!!!")

    //SC Loader.
    const CLIEND_ID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);
    (async () => {
        try {
            if (process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIEND_ID), {
                    body: commands
                });
                console.log("Successfully loaded Commands globally!")
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIEND_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Successfully loaded Commands locally!")
            }
        } catch (err) {
            if (err) console.error(err);
        }
    })();
})

//SC Continued.
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch(err) {
        if (err) console.error(err);

        await interaction.reply({
            content: "For some reason, I wasn't able to execute this Command, try executing this Command again and if it does't work, Email the Dev! (**/devmail**)",
            ephemeral: true,
        });
    }
});

//--Commands--
//++Simple text Commands++ 

//Text Commands.
client.on("messageCreate", (message) => {
    //Hello Command.
    if (!message.content.startsWith(prefix)) return;
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

//The Peeps related Commands.
client.on("messageCreate", (message) => {
    //++Members++
    //Nikki Doodle.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}nikkidoodle`) {
        message.channel.send("*Insert a Nikki Doodle Quote here*")
    }
    //Elijah Perry.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}elijahperry`) {
        message.channel.send("*Insert a ElijahPerry Quote here*")
    }
    //Kami.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}kami`) {
        message.channel.send("*Insert a Kami Quote here*")
    }
    //Greninja11.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}greninja11`) {
        message.channel.send("(DEV) *Fucking kill me i hate this damn bot*")
    }
    //LoganSlinderman.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}loganslinderman`) {
        message.channel.send("*Insert a Loganslinderman Quote here*")
    }
    //BeastlyBoy.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}beastlyboy`) {
        message.channel.send("*Insert a BeastlyBoy Quote here*")
    }
    //BrandonB.B.B.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}bradonbbb`) {
        message.channel.send("*Insert a Brandon B.B.B Quote here*")
    }
    //no
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}killer`) {
        message.channel.send("**No, Why?**")
    }
})

//++Help Commands++

//Help Command.
client.on("messageCreate", (message) => {
    //Help Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}help`) {
        message.channel.send("Hello! I've seen you just used the **/help** Command, this Command isn't fully finished at the moment but here are some Commands one can use!")
        message.channel.send("**/bingbong** | **/speak** | **/bye** | **hello**")
        message.channel.send("Bot related Commands: **/botinfo** | **/scode** | **/patchnotes**.")
        message.channel.send("Moderation Commands: **/modhelp**")
        message.channel.send("Dev Commands: **/devlist**.")
    }
    //ModHelp command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}modhelp`) {
    message.channel.send("*Being worked on!*")
    }
})

//++DevCommands++

//Dev Command.
client.on("messageCreate", (message) => {
    //DevHelp Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}devlist`) {
        message.channel.send("Hello! I've seen you just used the **/devlist** Command.")
        message.channel.send("Some Commands you can use is: **/devmail** | **/devdiscord** | **/devinfo** | **/devnews** | **/subdevupdates**. (This command is still being worked on and being expanded on)")
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
        message.channel.send("There is no new DevNews at the moment.")
    }
})

//++Miscellaneous Commands++

//Bot related Commands.
client.on("messageCreate", (message) => {
    //BotInfo Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}botinfo`) {
        message.channel.send("HELLO! My name is ThePeepsBOT!")
        message.channel.send("Im am a Bot made by Greninja11 for **The Peeps** and FANS! (*You can add me to your own Discord Server after Gren is fully done coding me!*)")
        message.channel.send("My current prefix is **/**, to see my Sorce Code use **/scode**!")
        message.channel.send("To know more about my Developer use **/devinfo**!")
    }
    //PatchNotes Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}patchnotes`) {
        message.channel.send("PatchNotes as of April-16-2022")
        message.channel.send("-There are no PatchNotes at the moment.")
    }
    //SubDevUpdates Command.
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}subdevupdates`) {
        message.channel.send("Hello! I've seen that you just used the **/subdevupdates** Command, We plan on adding a Subscription service later down the line, to be up-to-date of this Command, you can use **/patchnotes** or **/devnews**!")
    }
})

//SCode Command.
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `${prefix}scode`) {
        message.channel.send("*My Sorce Code isn't public yet because Im am not fully coded...*")
    }
})

//--Other--
//Peeps BOT login.
client.login(process.env.TOKEN)