
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
	name: String,
	description: String,
	thumbnail: String,
	stock: Number,
	price: Number,
	code: String,
	timestamp: String,
	id: Number,
});

const Product = mongoose.model('Product', ProductsSchema);

module.exports = Product;