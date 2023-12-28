const { Event } = require('../BASE.js');

class SlashHandler extends Event {
  constructor(client){
    super(client, {
      name: 'interactionCreate'
    });
  }

  async execute (interaction){
    if(!interaction.isCommand()) return;
    let cmd = interaction.client.slash_commands.get(interaction.commandName);
    if(cmd){
      cmd.execute( interaction );
    }
  }
}

module.exports = SlashHandler;