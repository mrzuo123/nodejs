const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proSchema = new Schema({
  name: String,
  descriptions: String,
  cover_img: String,
  price: String,
  content: String,
  quantity: String,
})

const Products = mongoose.model('products', proSchema);

module.exports = Products;