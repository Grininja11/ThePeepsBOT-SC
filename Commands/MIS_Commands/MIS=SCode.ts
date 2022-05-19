//Const Values.
const { SlashCommandBuilder } = require('@discordjs/builders');

//Scode Command.
module.exports = {
  data: new SlashCommandBuilder()
    .setName("scode")
    .setDescription("My current Source Code!"),
  async execute(interaction) {
    interaction.reply({
      content: "Im am not fully coded yet but here is my current Source Code! https://github.com/Grininja11/ThePeepsBOT-SC",
      ephemeral: false
    });
  }
}