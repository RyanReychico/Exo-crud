var mongoose = require('mongoose')

var chaineSchema = new mongoose.Schema({
  chaineContenu: String,
  user_id: Number
  }, { collection: 'chaine' })

module.exports = mongoose.model('chaine', chaineSchema)