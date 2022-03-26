const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
     data: new SlashCommandBuilder()
          .setName('kbbi')
          .setDescription('Find word meanings on KBBI')
          .addStringOption(option => 
               option
                    .setName('kata')
                    .setDescription('Kata yang ingin dicari')
                    .setRequired(true)),
     async execute(interaction){
          try {
               await interaction.deferReply()
               const kata = interaction.options.getString('kata')
               const response = await fetch(`https://new-kbbi-api.herokuapp.com/cari/${kata}`)
               const result = await response.json()
               if(!result.status) return interaction.reply("Kata tidak ditemukan")
               const {lema, arti } = result.data[0]
               const embed = new MessageEmbed()
                    .setTitle(lema)
                    .setDescription(arti.map(kata => {
                         return `${kata.kelas_kata} \n ${kata.deskripsi}`
                    } ).join("\n\n"))
                    .setColor("WHITE")
               await interaction.editReply({embeds: [embed]})
          } catch (error) {
               return
          } 
     },
     async run(client, msg, args){
          try {
               const kata = args.join(" ")
               const response = await fetch(`https://new-kbbi-api.herokuapp.com/cari/${kata}`)
               const result= await response.json()
               if(!result.status) return msg.reply("Kata tidak ditemukan")
               const { lema, arti } = result.data[0]
               const embed = new MessageEmbed()
                    .setTitle(lema)
                    .setDescription(arti.map(kata => {
                         return `${kata.kelas_kata} \n ${kata.deskripsi}`
                    } ).join("\n\n"))
                    .setColor('WHITE')
               msg.reply({embeds: [embed]})
          } catch (error) {
               return
          }
     }

}