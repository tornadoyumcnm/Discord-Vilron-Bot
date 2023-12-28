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
            commands: ['kullanıcı-bilgi', 'kullanıcıbilgi']
        });
    }
    async execute(message) {
const args = message.content.split(" ")

const isim = db.fetch(`isim_${message.author.id}`)
const ülkeisim = db.fetch(`ülkeisim_${message.author.id}`)
const para = db.fetch(`para_${message.author.id}`)

let ulkeisim = db.fetch(`ülkeisim_${message.author.id}`)
if (!ulkeisim) return message.reply({ embeds: [
new EmbedBuilder()
.setDescription(`Kayıt olmamışsınız, kayıt olmak için **v!kayıt <isim> <ülkeismi>**.`)
.setColor("Red")
.setAuthor({ name: `${client.user.username} - Hata!`, iconURL: client.user.avatarURL({size: 2048}) })
.setFooter({ text: `${message.author.username} tarafından hata alındı!`, iconURL: `https://cdn.discordapp.com/attachments/1175150081683488848/1175841682881794139/708996099460825140.webp?ex=656cb2e7&is=655a3de7&hm=36404d881602c2645dbfc1fd359721c6ea0b8222b5e7d9141d9fdde382e1b941&` })
.setTimestamp()
]})


const embed = new EmbedBuilder()
.setColor(config.renkler.anarenk)
.setAuthor({ name: `${client.user.username} - Kullanıcı Bilgi`, iconURL: message.author.avatarURL({size: 2048}) })
.setDescription(`> **Not:** Burada her şey gözükmektedir, o yüzden bu burda var deme!`)
.addFields(
{ name: `🪙 Toplam Paran:`, value: `\`\`\`${para}\`\`\``, inline: true },
{ name: `👤 Oyundaki ismin:`, value: `\`\`\`${isim}\`\`\``, inline: true },
{ name: `🏴 Ülke ismin:`, value: `\`\`\`${ülkeisim}\`\`\``, inline: true },
)
await message.channel.send({ embeds: [embed] })

    }
}

module.exports = HelpCommand;