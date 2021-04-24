const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  imageUrl: String,
  email: String,
  password: String,
  createdAt: String,
})

module.exports = model('User', userSchema)
