const { AttachmentBuilder, Discord, Client, Collection, IntentsBitField, Partials, EmbedBuilder, ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle, InteractionType, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField, messageLink } = require('discord.js');
const config = require('./src/config/config')
const ms = require("ms")
const db = require("croxydb")
const moment = require("moment");
require("moment-duration-format");
const { createCanvas, loadImage } = require('canvas');

const client = (global.client = new Client({
  intents: Object.keys(IntentsBitField.Flags),
  partials: Object.keys(Partials),
  presence: {
    activities: [
      { name: `${config.durum}`, type: 3 },
    ]
  }
}));

client.prefix_commands = new Collection();
client.slash_commands = new Collection();

client.on('ready', () => {
  require('./src/handlers/prefixHandler.js');
  require('./src/handlers/slashHandler.js');
  require('./src/handlers/eventHandler.js');
  require('./src/handlers/mongoHandler.js');
console.log(`> [Client]: Bot actived with "${client.user.username}" username..`);
});

client.login(require('./src/config/client.token.js'))
.then(() => {
  console.log(`> [Client]: Bot was successfully logined in token.`);
}).catch((err) => {
  console.log(`>> [Client]: Bot an error occured.\n>> [Error]: ${err}`);
});

client.on('ready', () => {
  client.on('error', console.error);
  client.on('shardError', console.error);
  client.on('shardDisconnect', console.error);
  client.on('warn', console.error);
  process.on('unhandledRejection', console.error);
  process.on('uncaughtException', console.error);
  process.on('uncaughtExceptionMonitor', console.error);
  process.on('rejectionHandled', err => { console.log(err) })
console.log(`> [Error System]: error system is in working condition!`);
});