const { SlashCommand } = require('../BASE.js');
const { EmbedBuilder, InteractionCollector, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const Discord = require("discord.js");
const client = require("discord.js");
const cache = require("discord.js");
const ze = require("croxydb")
const os = require(`os`);
const config = require("../config/config.js")

class HelpCommands extends SlashCommand {
  constructor(client){
    super(client, {
        name: 'yardım',
        slashOptions : new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('yardım menüsüdür.')
    });
  }
async execute ( interaction ) {

const embed = new EmbedBuilder()
.setColor(`${config.renkler.anarenk}`)
.setDescription(`Yardım için **${config.prefix}yardım** yazman yeterli!`)
await interaction.reply({ embeds: [embed], ephemeral: true });

  }
}

module.exports = HelpCommands;