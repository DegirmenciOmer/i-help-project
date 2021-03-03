const { model, Schema } = require('mongoose');

const userSchema = new Schema({
<<<<<<< HEAD
    username: String,
    email: String,
    password: String,
    createdAt: String
})

module.exports = model('User', userSchema);
=======
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model('User', userSchema);
>>>>>>> development
