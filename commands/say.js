const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
     data: new SlashCommandBuilder()
          .setName('say')
          .setDescription('To say back what you inputted')
          .addStringOption(option => 
               option
                    .setName('text')
                    .setDescription('What do you want to say?')
                    .setRequired(true)),
     async execute(interaction){
          const say = interaction.options.getString('text')
          interaction.reply(say)
     },
     run(client, msg, args){
          const say = args.join(" ")
          msg.channel.send(say)
     }    
}