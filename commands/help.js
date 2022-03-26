const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
     data: new SlashCommandBuilder()
          .setName('help')
          .setDescription('List of commands'),
     async execute(interaction, client){
          const commands = client.commands.map(command => {
               return `${command.data.name}: ${command.data.description}`
          }).join('\n')
          const embed = new MessageEmbed()
               .setTitle('List of commands')
               .setDescription(commands)
          interaction.reply({embeds: [embed]})
     },
     run(client, msg, args){
          const commands = client.commands.map(command => {
               return `${command.data.name}: ${command.data.description}`
          }).join("\n")
          const embed = new MessageEmbed()
               .setTitle('List of commands')
               .setDescription(commands)
          msg.channel.send({embeds: [embed]})
     }
}