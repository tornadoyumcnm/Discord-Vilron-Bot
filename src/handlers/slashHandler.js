const { REST, Routes } = require('discord.js');
const fs = require('fs');
const client = global.client;

fs.readdir('./src/slash_commands/', (err, file) => {
  if(err) console.error(err);
  const arr = [];
  file.forEach((commandFile) => {
    const command = new (require(`../slash_commands/${commandFile}`))(client);
    if(!command.conf ||!command.execute) return;
    client.slash_commands.set(command.conf.name, command);
    arr.push(command.data);
    console.log(`> [Commands]: ${commandFile} için ${command.conf.name} komutu önbelleğe alındı.`);
  });
  if(arr.length <= 0){
    console.log(`> [Commands]: Hiç slash komut bulunamadı.`)
  }else{  
    const rest = new REST({ version: '10' }).setToken(client.token);
    rest.put(Routes.applicationCommands(client.user.id), { body: arr })
    .then(() => {
      console.log(`> [Commands]: ${arr.length} adet slash komut api entegrasyouyla cliente aktarıldı.`);
    }).catch((err) => {
      console.log(`>> [Commands]: ${arr.length} adet slash komut yüklenirken hata verdi.\n>> [Error]: ${err}`)
    });
  }
});