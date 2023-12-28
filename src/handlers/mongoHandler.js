const mongoose = require('mongoose');

mongoose.connect(require('../config/mongo.url.js'))
.then(setTimeout(() => {
  console.log(`> [CLoud]: Mongo DB bağlantısı sağlandı.`);
}, 3333)).catch((err) => {
  console.error(`>> [Cloud] Mongo DB api hatası verdi.\n>> [Error]: ${err}`)
});