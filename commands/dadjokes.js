const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')

module.exports = {
     data: new SlashCommandBuilder()
     .setName('dadjokes')
     .setDescription('Send random dadjokes'),
     async execute(interaction){
          const getJoke = async () => {
               try {
                    const response = await fetch("https://icanhazdadjoke.com", {
                         method: "GET",
                         headers: {Accept : "application/json"}
                    })
                    const data = await response.json()
                    const joke = await data.joke
                    if(!joke) interaction.reply("Joke unavailable") 
                    return joke
               } catch (error) {
                    return
               }
          }
          const toJoke = await getJoke(); 
          interaction.reply(toJoke)
     },
     async run(client, msg, args){
          const getJoke = async () => {
               try {
                    const response = await fetch("https://icanhazdadjoke.com", {
                         method: "GET",
                         headers: {Accept : "application/json"}
                    })
                    const data = await response.json()
                    const joke = await data.joke
                    if(!joke) interaction.reply("Joke unavailable") 
                    return joke
               } catch (error) {
                    return
               }
          }
          const toJoke = await getJoke(); 
          msg.reply(toJoke)
     }
}