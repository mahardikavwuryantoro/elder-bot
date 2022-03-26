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
          console.log(words)
          ud.define(word, (err, results) => {
               if(err){
                   return interaction.reply('Word unavailable')
                   
               }

               const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi
               const wordHeader = words.map(word => word.match(syllableRegex)).map(word => word.join('.')).join('.')
               console.log(word)

               const embed = new MessageEmbed()
                    .setTitle(word)
                    .setURL(`https://www.urbandictionary.com/define.php?term=${args.join('%20')}`)
                    .setDescription(`https://www.urbandictionary.com/define.php?term=${args.join('%20')}`)
                    .setFooter({text: 'Powered by Urban Dictionary'})
                    .setColor('WHITE')
               results.forEach(def => {
                    embed.addField(wordHeader, def.definition)
                    embed.addField('\u200b', '\u200b')

               }) 
               interaction.reply({embeds: [embed]})              
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
               const wordHeader = args.map(word => word.match(syllableRegex)).map(word => word.join('.')).join('.')

               const embed = new MessageEmbed()
                    .setTitle(word)
                    .setURL(`https://www.urbandictionary.com/define.php?term=${args.join('%20')}`)
                    .setDescription(`https://www.urbandictionary.com/define.php?term=${args.join('%20')}`)
                    .setFooter({text: 'Powered by Urban Dictionary'})
                    .setColor('WHITE')
               results.forEach(def => {
                    embed.addField(wordHeader, def.definition)
                    embed.addField('\u200b', '\u200b')

               })
               console.log(embed)
               msg.reply({embeds: [embed]})              
          })
     }
}