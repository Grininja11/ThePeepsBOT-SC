//Const Values.
const { SlashCommandBuilder } = require('@discordjs/builders');

//Test Command.
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("A cool test!"),
  async execute(interaction) {
    interaction.reply({
      content: "A **Very** cool test!",
      ephemeral: false
    });
  }
}