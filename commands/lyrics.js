const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { spawn } = require('child_process');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('lyrics')
          .setDescription('Find a song lyrics')
          .addStringOption(option => 
               option
                    .setName('title')
                    .setDescription('The title of the song')
                    .setRequired(true)
          )
          .addBooleanOption(option => 
               option
                    .setName('monospace')
                    .setDescription('Make the lyric goes monospace')
          ),
     async execute(interaction){
          await interaction.deferReply()
          const pyprog = spawn('python', ['E:/Discord Bot/commands/test.py', interaction.options.getString('title')]);

          let monospace = ''
          if(interaction.options.getBoolean('monospace')){
               monospace = `\`\`\``
          }
     
          pyprog.stdout.on('data', async function(data) {
              
               try { 
                   const lyrics = data.toString()
                   const title = lyrics.split('\n')
                   
                   const embed = new MessageEmbed()
                         .setTitle(JSON.stringify(title[0]).slice(1, -3))
                         .setDescription(`${monospace}${lyrics.split('\n').slice(1).join('\n')}${monospace}`)
                         .setFooter({text:'Powered by animelyrics.com'})
                    await interaction.editReply({embeds: [embed]})
              } catch (error) {
                   await interaction.editReply('Timeout')
              } 
          })

     },
     async run(client, msg, args){
          
          const pyprog = spawn('python', ['E:/Discord Bot/commands/test.py', args]);
      
          pyprog.stdout.on('data', function(data) {
              const lyrics = data.toString()
              const title = lyrics.split('\n')
              
              console.log( typeof title, JSON.stringify(title[0]))
              const embed = new MessageEmbed()
                    .setTitle(JSON.stringify(title[0]).slice(1, -3))
                    .setDescription(`\`\`\`${lyrics.split('\n').slice(1).join('\n')}\`\`\``)
                    .setFooter({text: 'Powered by animelyrics.com'})
               msg.channel.send({embeds: [embed]}) 
          });
     }
}