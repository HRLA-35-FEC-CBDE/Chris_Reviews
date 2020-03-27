const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/products'
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected!')
})

db.on('error', err => {
  console.error('connection error:', err)
})

module.exports = db;