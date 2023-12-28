const { PrefixCommand } = require('../BASE.js');
const { EmbedBuilder, SlashCommandBuilder, ButtonStyle, MessageActivityType, StringSelectMenuBuilder,ActionRowBuilder } = require('discord.js');
const { ButtonBuilder } = require('discord.js')
const Discord = require("discord.js")
const config = require('../config/config.js')
const ms = require("ms")
const db = require("croxydb")
const os = require(`os`);
const apii = require("useful-tools")

class HelpCommand extends PrefixCommand {
    constructor(client) {
        super(client, {
            commands: ['yardım', 'help', 'yardim']
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

const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setCustomId("swsayac")
.setLabel(`Sunucu sayısı: ${client.guilds.cache.size}`)
.setEmoji("🧠")
.setDisabled(true)
.setStyle(Discord.ButtonStyle.Secondary),
new Discord.ButtonBuilder()
.setCustomId("membersayac")
.setLabel(`Kullanıcı sayısı: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)
.setEmoji("👤")
.setDisabled(true)
.setStyle(Discord.ButtonStyle.Secondary),
)

const rowr = new Discord.ActionRowBuilder()
        .addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("yrdm")
            .setPlaceholder(`Bir kategori seç.`)
            .addOptions([
              {
                label: `Savaş - Ekonomi`,
                description: `Savaş - Ekonomi komutları.`,
                value: 'command',
                emoji: `🪙`
              },
            ])
        )

const embed = new EmbedBuilder()
.setDescription(`Selam, ben **${client.user.username}** eğer ki beni önceden biliyorsan önceden moderasyon botu olduğumu da biliyorsun demektir.\n\n● <:yeni:1175427079647543378> **${config.yazılar.güncelleme}**\n● Toplam sunucularım: **${client.guilds.cache.size}**\n● Şuanki prefixim: **${config.prefix}**\n\n> Botta sadece 1 sistem vardır o da savaş ekonomi sistemidir, ona bakmak için de aşşağıdaki **select menu**'ye basman yeterli!`)
.setColor(config.renkler.anarenk)
.setThumbnail(client.user.avatarURL({size: 2048}))
.setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL({size: 2048}) })
.setImage(config.resim)
.setFooter({ text: `${message.author.username} tarafından istendi.`, iconURL: message.author.avatarURL() })
.setTimestamp()
await message.channel.send({ embeds: [embed], components: [rowr, row] })

const filter = i => i.customId === 'yrdm' && i.user.id === message.author.id;

const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

let isButtonClicked = false; 
collector.on('collect', i => {
  if (i.values && i.values.length > 0) {
    let choice = i.values[0];
  if (choice === 'command') {
    if (isButtonClicked) return;

    isButtonClicked = true; 
    
    const updateButtons = (currentPage, pages, row) => {
      row.components[0].setDisabled(currentPage === 0);
      row.components[1].setDisabled(currentPage === pages.length - 1);
  };

    const pages = [
      new EmbedBuilder().setAuthor({ name: `${client.user.username} - Sayfa 1`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setColor(`${config.renkler.anarenk}`)
      .setImage(`${config.resim}`)
      .setThumbnail(client.user.avatarURL({size: 2048}))
      .setDescription(`
- **[${config.prefix}kayıt <isim> <ülkeismi>](${config.destek}) →** Kayıt olursun.
- **[${config.prefix}savaş <@kullanıcı>](${config.destek}) →** Savaş ilan edersin.
- **[${config.prefix}kullanıcı-bilgi](${config.destek}) →** Profiline bakarsın.
- **[${config.prefix}bilgiler](${config.destek}) →** Bilgilerine bakarsın.
- **[${config.prefix}karakterler](${config.destek}) →** Karakterlerine bakarsın.
- **[${config.prefix}seviye](${config.destek}) →** Seviyene bakarsın.
- **[${config.prefix}ekonomi](${config.destek}) →** Ekonomine bakarsın.
- **[${config.prefix}market](${config.destek}) →** Markete bakarsın.
- **[${config.prefix}para-birimi](${config.destek}) →** Para birimine bakarsın.
- **[${config.prefix}günlük](${config.destek}) →** ${client.user.username}'dan günlük para alırsın.
      `)
      .setFooter({ text: `${message.author.username} tarafından istendi.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp(),
      
      new EmbedBuilder().setAuthor({ name: `${client.user.username} - Sayfa 2`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setColor(`${config.renkler.anarenk}`)
      .setImage(`${config.resim}`)
      .setThumbnail(client.user.avatarURL({size: 2048}))
      .setDescription(`
- **[${config.prefix}ilişkiler](${config.destek}) →** Ülkeler ile arandaki ilişkiye bakarsın.
- **[${config.prefix}ittifaklık-kur](${config.destek}) →** İttifaklık kurmaya bakarsın.
- **[${config.prefix}savaş-istatistik](${config.destek}) →** Savaş istatistiğine bakarsın.
- **[${config.prefix}cüzdan](${config.destek}) →** Toplam parana bakarsın.
- **[${config.prefix}dövizler](${config.destek}) →** Ülkelerin para fiyatlarına bakarsın.
      `)
      .setFooter({ text: `${message.author.username} tarafından istendi.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp(),

      new EmbedBuilder().setDescription('Yakında...').setColor("Blurple"),
      new EmbedBuilder().setDescription('Yakında...').setColor("Blurple"),
      new EmbedBuilder().setDescription('Yakında...').setColor("Blurple"),
  ];

  let currentPage = 0;

  const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
              .setCustomId('previous_button')
              .setLabel('Previous')
              .setEmoji("<:geri:1175452761530318968>")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(true),
          new ButtonBuilder()
              .setCustomId('next_button')
              .setLabel('Next')
              .setEmoji("<:ileri:1175452759022116864>")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(pages.length === 1)
      );

  const sentMessage = i.update({ embeds: [pages[currentPage]], components: [row] });

  const filter = i => i.customId === 'previous_button' || i.customId === 'next_button';
  const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', async i => {
      if (i.customId === 'previous_button') {
          currentPage = currentPage > 0 ? --currentPage : 0;
      } else if (i.customId === 'next_button') {
          currentPage = currentPage < pages.length - 1 ? ++currentPage : pages.length - 1;
      }
      updateButtons(currentPage, pages, row);

      await i.update({ embeds: [pages[currentPage]], components: [row] });
  });

  }
}
});

collector.on('end', () => { isButtonClicked = false; });

    }
}

module.exports = HelpCommand;