const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  category: String,
  createdAt: String,
  comments: [
    {
      body: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: String,
    },
  ],
  likes: [
    {
      createdAt: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = model('Post', postSchema)
