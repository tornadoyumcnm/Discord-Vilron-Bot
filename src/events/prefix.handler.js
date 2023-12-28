const { Event } = require('../BASE.js');
const { prefix } = require('../config/config.js');

class PrefixHandler extends Event {
  constructor(client){
    super(client, {
      name: 'messageCreate'
    });
  }

  async execute (message){
    if(!message.guild || !message.content.startsWith(prefix) || message.author.bot) return; 
    let args = message.content.substring(prefix.length).trim().split(' ');
    let commandName = args[0].toLowerCase();
    message.args = args.splice(1);

    let cmd = message.client.prefix_commands.get(commandName);
    if(cmd){
      cmd.execute( message );
    }
  }
}

module.exports = PrefixHandler;