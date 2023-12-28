const { PrefixCommand } = require('../BASE.js');
const { EmbedBuilder, InteractionCollector, SlashCommandBuilder, ButtonStyle, Discord, MessageActivityType, Colors } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const config = require('../config/config.js')
const ms = require("ms")
const db = require("croxydb")
const os = require(`os`);
const apii = require("useful-tools")
class HelpCommand extends PrefixCommand {
    constructor(client) {
        super(client, {
            commands: ['karakterler', 'karakter']
        });
    }
    async execute(message) {
const args = message.content.split(" ")

const embed = new EmbedBuilder()
.setColor(config.renkler.anarenk)
.setDescription(`- **Not:** karakterler varsa \`✅\` yoksa \`❌\` olarak gösterilir.`)
.addFields(
//{ name: ``, value: ``, inline: true },
{ name: `Dany bruth`, value: `❌`, inline: true },
{ name: `Validir yaho`, value: `❌`, inline: true },
{ name: `Recy leo`, value: `❌`, inline: true },
)
await message.channel.send({ embeds: [embed] })

    }
}

module.exports = HelpCommand;