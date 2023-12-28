const fs = require('fs');
const client = global.client;

fs.readdir('./src/events/', async (err, file) => {
  if(err) console.error(err);
  file.forEach((eventFile) => {
    const event = new (require(`../events/${eventFile}`))(client);
    if(!event.conf || !event.execute) return;
    client.on(event.conf.name, event.execute);
    console.log(`> [Events]: ${eventFile}, ${event.conf.name} eventi yüklendi.`);
  });
});