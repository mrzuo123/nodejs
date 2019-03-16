const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String,
  avatar: String,
  nickName: String
})

const User = mongoose.model('user', userSchema);

module.exports = User;