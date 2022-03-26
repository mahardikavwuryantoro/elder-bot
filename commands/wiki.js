const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
     data: new SlashCommandBuilder()
          .setName('wiki')
          .setDescription('Search something on Wikipedia')
          .addStringOption(option => 
               option
                    .setName('query')
                    .setDescription('Please provide query')
                    .setRequired(true)),
     async execute(interaction){
          let toSearch = interaction.options.getString('query').split(/ +/g).join('_')
          console.log(toSearch)
          if(!toSearch) return interaction.reply({content: 'Please provide query', ephemeral: true})
          interaction.reply(`https://en.wikipedia.org/wiki/${toSearch}`)
     },

     run(client, msg, args){
          let toSearch = args.join('_')
          if(!toSearch) return msg.channel.reply('Please provide query')
          msg.channel.send(`https://en.wikipedia.org/wiki/${toSearch}`)
     }
}