const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
     data: new SlashCommandBuilder()
     .setName('ping')
     .setDescription('To reply with "PONG!!!"'),
     async execute(interaction){
          interaction.reply("PONG!!!")
     },
     run(client, msg, args){
          msg.reply("PONG!!!")
     }
}