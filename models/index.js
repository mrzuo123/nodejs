const mongoose = require('mongoose');

const User = require('./user')//导入模块

const Product = require('./product')

mongoose.connect('mongodb://localhost:27017/dog-shop', {useNewUrlParser: true});

module.exports = {
  User,
  Product
}//导出

