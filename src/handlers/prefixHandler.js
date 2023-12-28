const fs = require('fs');
const client = global.client;

fs.readdir('./src/prefix_commands/', (err, file) => {
  if(err) console.error(err);
  file.forEach((commandFile) => {
    const command = new (require(`../prefix_commands/${commandFile}`))(client);
    if(!command.conf ||!command.execute) return;
    command.conf.commands.forEach((cmd) => client.prefix_commands.set(cmd, command));
    console.log(`> [Commands]: ${commandFile} dosyasında ${command.conf.commands.length} adet komut önbelleğe alındı.`);
  });
});