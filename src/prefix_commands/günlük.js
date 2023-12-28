const { PrefixCommand } = require('../BASE.js');
const { EmbedBuilder, InteractionCollector, SlashCommandBuilder, ButtonStyle, Discord, MessageActivityType } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const config = require('../config/config.js')
const ms = require("ms")
const db = require("croxydb")
const os = require(`os`);
const apii = require("useful-tools")
class HelpCommand extends PrefixCommand {
    constructor(client) {
        super(client, {
            commands: ['günlük']
        });
    }
    async execute(message) {
const args = message.content.split(" ")

let ulkeisim = db.fetch(`ülkeisim_${message.author.id}`)
if (!ulkeisim) return message.reply({ embeds: [
new EmbedBuilder()
.setDescription(`Kayıt olmamışsınız, kayıt olmak için **v!kayıt <isim> <ülkeismi>**.`)
.setColor("Red")
.setAuthor({ name: `${client.user.username} - Hata!`, iconURL: client.user.avatarURL({size: 2048}) })
.setFooter({ text: `${message.author.username} tarafından hata alındı!`, iconURL: `https://cdn.discordapp.com/attachments/1175150081683488848/1175841682881794139/708996099460825140.webp?ex=656cb2e7&is=655a3de7&hm=36404d881602c2645dbfc1fd359721c6ea0b8222b5e7d9141d9fdde382e1b941&` })
.setTimestamp()
]})

const lastDaily = db.fetch(`lastDaily_${message.author.id}`);
if (lastDaily && Date.now() - lastDaily < 24 * 60 * 60 * 1000) {
const timeLeft = lastDaily + 24 * 60 * 60 * 1000 - Date.now();
const timeLeftFormatted = ms(timeLeft, { long: true });
const embed = new EmbedBuilder()
.setDescription(`24 saat dolmadı. Lütfen **${timeLeftFormatted}** ⏲️ sonra tekrar dene.`)
.setColor("Red")
.setAuthor({ name: `${client.user.username} - Hata!`, iconURL: client.user.avatarURL({size: 2048}) })
.setFooter({ text: `${message.author.username} tarafından hata alındı!`, iconURL: `https://cdn.discordapp.com/attachments/1175150081683488848/1175841682881794139/708996099460825140.webp?ex=656cb2e7&is=655a3de7&hm=36404d881602c2645dbfc1fd359721c6ea0b8222b5e7d9141d9fdde382e1b941&` })
.setTimestamp();

return message.reply({ embeds: [embed] });
}

const para = Math.floor(Math.random() * 10) + 1

const embed = new EmbedBuilder()
.setDescription(`Tebrikler, toplam da **${para} Para** 🪙 kazandın!`)
.setColor("Green")
.setAuthor({ name: `${client.user.username} - Günlük Ödül`, iconURL: client.user.avatarURL({size: 2048}) })
.setFooter({ text: `${message.author.username} tarafından istendi.`, iconURL: message.author.avatarURL() })
.setTimestamp()
await message.channel.send({ embeds: [embed] })

db.add(`para_${message.author.id}`, para)
db.set(`lastDaily_${message.author.id}`, Date.now());

    }
}

module.exports = HelpCommand;