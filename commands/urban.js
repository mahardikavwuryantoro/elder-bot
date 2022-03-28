const { SlashCommandBuilder } = require('@discordjs/builders')
const ud = require('urban-dictionary')
const { MessageEmbed } = require('discord.js')

module.exports = {
     data: new SlashCommandBuilder()
          .setName('urban')
          .setDescription('Find words definition')
          .addStringOption(option => 
               option
                    .setName('word')
                    .setDescription('Word to find the description')
                    .setRequired(true)
          ),
     execute(interaction){
          const word = interaction.options.getString('word').toLowerCase()
          
          const words = word.split(' ')
          
          ud.define(word, (err, results) => {
               if(err){
                   return interaction.reply('Word unavailable')
                   
               }

               const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi
               const wordHeader = words.map(word => word.match(syllableRegex)).map(word => word.join('.')).join(' - ')
          

               const embed = new MessageEmbed()
                    .setTitle(word)
               if(results.length > 5){
                    const embed2 = new MessageEmbed()
                    for(let i = 0; i <= results.length / 2 - 1; i++){
                         embed.setURL(`https://www.urbandictionary.com/define.php?term=${words.join('%20')}`)
                         embed.setDescription('-------------')
                         embed.setColor('WHITE')
                         embed.addField(`${i + 1}`, '\u200b', true)
                         embed.addField(wordHeader, `${results[i].definition}`, true)
                         embed.addField('\u200b', '\u200b')
                    }
                    for(let i = results.length / 2 ; i < results.length ; i++){
                         embed2.setColor('WHITE')
                         embed2.setFooter({text: 'Powered by Urban Dictionary'})
                         embed2.addField(`${i + 1}`, '\u200b', true)
                         embed2.addField(wordHeader, `${results[i].definition}`, true)
                         embed2.addField('\u200b', '\u200b')
                    }
                    interaction.reply({embeds: [embed, embed2]})
     
               }else{
                    results.forEach((def, i) => {
                         embed.setURL(`https://www.urbandictionary.com/define.php?term=${words.join('%20')}`)
                         embed.setDescription('-------------')
                         embed.setColor('WHITE')
                         embed.setFooter({text: 'Powered by Urban Dictionary'})
                         embed.addField(`${i + 1}`, '\u200b', true)
                         embed.addField(wordHeader, def.definition, true)
                         embed.addField('\u200b', '\u200b')
                    })
                    interaction.reply({embeds: [embed]})
               }              
          })

     },
     run(client, msg, args){
          if(!args) return msg.reply('Please provide a word')
          const word = args.join(' ')
          ud.define(word, (err, results) => {
               if(err){
                   return msg.reply('Word unavailable')
               }
               const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi
               const wordHeader = args.map(word => word.match(syllableRegex)).map(word => word.join('.')).join(' - ')

               const embed = new MessageEmbed()
                    .setTitle(word)
                    
               
               if(results.length > 5){
                    const embed2 = new MessageEmbed()
                    for(let i = 0; i <= results.length / 2 - 1; i++){
                         embed.setURL(`https://www.urbandictionary.com/define.php?term=${args.join('%20')}`)
                         embed.setDescription('-------------')
                         embed.setColor('WHITE')
                         embed.addField(`${i + 1}`, '\u200b', true)
                         embed.addField(wordHeader, `${results[i].definition}`, true)
                         embed.addField('\u200b', '\u200b')
                    }
                    for(let i = results.length / 2 ; i < results.length ; i++){
                         embed2.setColor('WHITE')
                         embed2.setFooter({text: 'Powered by Urban Dictionary'})
                         embed2.addField(`${i + 1}`, '\u200b', true)
                         embed2.addField(wordHeader, `${results[i].definition}`, true)
                         embed2.addField('\u200b', '\u200b')
                    }
                    msg.reply({embeds: [embed, embed2]})

               }else{
                    results.forEach((def, i) => {
                         embed.setURL(`https://www.urbandictionary.com/define.php?term=${args.join('%20')}`)
                         embed.setDescription('-------------')
                         embed.setColor('WHITE')
                         embed.setFooter({text: 'Powered by Urban Dictionary'})
                         embed.addField(`${i + 1}`, '\u200b', true)
                         embed.addField(wordHeader, def.definition, true)
                         embed.addField('\u200b', '\u200b')
                    })
                    msg.reply({embeds: [embed]})
               }
               
              
                
               
             
          })
     }
}