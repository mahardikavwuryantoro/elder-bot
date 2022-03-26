const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
     data: new SlashCommandBuilder()
          .setName("cat")
          .setDescription("Send a random cat image")
          .addBooleanOption(option => 
               option
                    .setName('fact')
                    .setDescription('Get a random cat fact')),
     async execute(interaction){
          await interaction.deferReply()
          const getCatFact = async () => {
               try {
                    const response  = await fetch('https://catfact.ninja/fact', {
                         method: 'GET',
                         headers: {Accept: 'application/json'}
                    })
                    const data = await response.json()
                    const catFact = data.fact
                    if(!catFact) return interaction.reply('Facts unavailable')
                    return catFact
               } catch (error) {
                    return
               }
          }

          const getCat = async () => {
               try {
     
                    const response = await fetch('https://aws.random.cat/meow')
                    const cat = await response.json()
                    return cat.file

               } catch (error) {
                    return
               }
          }

          const cat = await getCat()
          const catFact = await getCatFact()
          
          
          if(interaction.options.getBoolean('fact')){
               const embed = new MessageEmbed()
                    .setImage(cat)
                    .setTitle(`Cat Facts #${Math.floor((Math.random() * 500) + 1)}`)
                    .setDescription(catFact)
                    .setColor('WHITE')
               
               await interaction.editReply({embeds: [embed]})

          }else{

               await interaction.reply(cat)

          }
     },
     
     async run(client, msg, args){
          const getCatFact = async () => {
               try {
                    const response  = await fetch('https://catfact.ninja/fact', {
                         method: 'GET',
                         headers: {Accept: 'application/json'}
                    })
                    const data = await response.json()
                    const catFact = data.fact
                    if(!catFact) return msg.channel.send('Facts unavailable')
                    return catFact
               } catch (error) {
                    return
               }
          }

          const getCat = async () => {
               try {
     
                    const response = await fetch('https://aws.random.cat/meow')
                    const cat = await response.json()
                    return cat.file

               } catch (error) {
                    return
               }
          }

          const cat = await getCat()
          const catFact = await getCatFact()
          console.log(catFact, args)
          
          if(args[0] ==='fact'){
               const req = await msg.channel.send('Getting your chubby cat...')
               const embed = new MessageEmbed()
                    .setImage(cat)
                    .setTitle(`Cat Facts #${Math.floor((Math.random() * 500) + 1)}`)
                    .setDescription(catFact)
                    .setColor('WHITE')
               
               req.edit({content: null, embeds: [embed]})

          }else{

               await msg.reply(cat)

          }
     }
}