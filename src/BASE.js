class PrefixCommand {
  constructor(client, {
    commands = null
  }){
    this.conf = {
      commands
    }
  }
  async execute(){

  }
}

class SlashCommand {
  constructor(client, {
    name = null,
    slashOptions = {}
  }){
    this.data = slashOptions
    this.conf = {
      name
    }
  }

  async execute (){

  }
} 

class Event {
  constructor(client, {
    name = null
  }){
    this.conf = {
      name
    }
  }
  async execute (){

  }
}

module.exports = { PrefixCommand, SlashCommand, Event };