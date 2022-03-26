const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')

module.exports = {
     data: new SlashCommandBuilder()
          .setName('catfact')
          .setDescription('Get a random cat facts'),
     async execute(interaction){
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
          const catFact = await getCatFact()
          interaction.reply(catFact)
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
                    if(!catFact) return msg.reply('Facts unavailable')
                    return catFact
               } catch (error) {
                    return
               }
          }
          const catFact = await getCatFact()
          msg.reply(catFact)
     }
}