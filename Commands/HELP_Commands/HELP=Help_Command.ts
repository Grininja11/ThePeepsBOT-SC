//Const Values.
const { SlashCommandBuilder } = require('@discordjs/builders');

//Scode Command.
module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("My main Help Command!"),
    
  async execute(interaction) {
    interaction.reply({
      content: "Hello! I've seen you just used the **/help** Command, this Help List isn't fully finished at the moment but here are some Commands one can use! **/bingbong** | **/speak** | **/bye** | **hello**, Bot related Commands: **/botinfo** | **/scode** | **/patchnotes**, Other /help Commands: **/devlist** | **/peepshelp** | **/modhelp**",
      ephemeral: false
    });
  }
};