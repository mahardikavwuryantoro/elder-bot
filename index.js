const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('node:fs')
const { Client, Intents, Collection } = require('discord.js')
const dotenv  = require('dotenv')
dotenv.config()

const prefix = "="

const client = new Client({
     intents: [
          Intents.FLAGS.GUILDS,
          Intents.FLAGS.GUILD_MESSAGES
     ]
})


const commandList = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [];

client.commands = new Collection()

for (const file of commandList){
     const command = require(`./commands/${file}`)
     commands.push(command.data.toJSON())
     client.commands.set(command.data.name, command)
}

client.once('ready', () => {
     console.log("Logged in successfully")
     // console.log(client.commands)
     const CLIENT_ID = client.user.id

     const rest = new REST({
          version: "9",
     }).setToken(process.env.BOT_TOKEN)

     rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), { 
          body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
})


client.on('interactionCreate', async interaction  => {
     if(!interaction.isCommand) return
     const command = client.commands.get(interaction.commandName)
     
     if(!command) return
     try {
         await command.execute(interaction, client)
     } catch (error) {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

     }
})


client.on('messageCreate', msg => {
     if(!msg.content.startsWith(prefix) || msg.author.bot) return

     const args = msg.content.slice(prefix.length).trim().split(/ +/g)
     const commandName = args.shift()
     const command = client.commands.get(commandName)

     command.run(client, msg, args);
     
})



client.login(process.env.BOT_TOKEN)