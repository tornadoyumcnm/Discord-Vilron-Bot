const { PrefixCommand } = require('../BASE.js');
const { EmbedBuilder, InteractionCollector, SlashCommandBuilder, ButtonStyle, Discord, MessageActivityType, MessageFlags } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const config = require('../config/config.js')
const ms = require("ms")
const db = require("croxydb")
const os = require(`os`);
const apii = require("useful-tools")
class HelpCommand extends PrefixCommand {
    constructor(client) {
        super(client, {
            commands: ['kayıt', 'register', 'kayıt-ol', 'kayıtol']
        });
    }
    async execute(message) {
const args = message.content.split(" ")

const isim = args[1]
const ülkeisim = message.content.split(' ').slice(2).join(' ');

const isimm = db.fetch(`isim_${message.author.id}`)
if (isimm)
return message.channel.send({ embeds: [
  new EmbedBuilder()
  .setAuthor({ name: `${client.user.username} - Hata!`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
  .setColor("Red")
  .setDescription(`Zaten kayıtlı durumdasınız!`)
  .setFooter({ text: `${message.author.username} tarafından hata alındı!`, iconURL: `https://cdn.discordapp.com/attachments/1175150081683488848/1175841682881794139/708996099460825140.webp?ex=656cb2e7&is=655a3de7&hm=36404d881602c2645dbfc1fd359721c6ea0b8222b5e7d9141d9fdde382e1b941&` })
  .setTimestamp()
]})
if (!isim)
return message.channel.send({
  embeds: [
    new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} - Hata!`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setColor("Red")
    .setDescription(`Lütfen bir **isim** giriniz ve daha sonra tekrar deneyiniz.`)
    .setFooter({ text: `${message.author.username} tarafından hata alındı!`, iconURL: `https://cdn.discordapp.com/attachments/1175150081683488848/1175841682881794139/708996099460825140.webp?ex=656cb2e7&is=655a3de7&hm=36404d881602c2645dbfc1fd359721c6ea0b8222b5e7d9141d9fdde382e1b941&` })
    .setTimestamp()
  ]
})
if (!ülkeisim)
return message.channel.send({
  embeds: [
    new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} - Hata!`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setColor("Red")
    .setDescription(`Lütfen bir **ülke isim** giriniz ve daha sonra tekrar deneyiniz.`)
    .setFooter({ text: `${message.author.username} tarafından hata alındı!`, iconURL: `https://cdn.discordapp.com/attachments/1175150081683488848/1175841682881794139/708996099460825140.webp?ex=656cb2e7&is=655a3de7&hm=36404d881602c2645dbfc1fd359721c6ea0b8222b5e7d9141d9fdde382e1b941&` })
    .setTimestamp()
  ]
})

const embed = new EmbedBuilder()
.setDescription(`Başarı ile kaydınız yapıldı!

> Yapılanlar:
- İsim: **${isim}**
- Ülke isim **${ülkeisim}**`)
.setColor("Green")
.setAuthor({ name: `${client.user.username} - Başarılı!`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
.setImage(`${config.resim}`)
.setFooter({ text: `${message.author.username} tarafından istendi.`, iconURL: `https://cdn.discordapp.com/attachments/1175150081683488848/1175841590519013457/708993792950140979.webp?ex=656cb2d1&is=655a3dd1&hm=a7652f78c619e02a0cd6d62ce4e0378f6037b99a0ac886f26b9924a50b548c56&` })
.setTimestamp()
await message.channel.send({ embeds: [embed] })

db.set(`isim_${message.author.id}`, isim)
db.set(`ülkeisim_${message.author.id}`, ülkeisim)
db.set(`para_${message.author.id}`, 100)

    }
}

module.exports = HelpCommand;