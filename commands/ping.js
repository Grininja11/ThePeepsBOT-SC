//Const values
const { SlashCommandBuilder } = require("@discordjs/builders");

//Modules exports
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    async execute(interaction) {
        interaction.reply({
            content: "Pong!",
            ephemeral: false
        });
    }
}