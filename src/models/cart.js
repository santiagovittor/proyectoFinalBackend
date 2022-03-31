
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartsSchema = new Schema({
	products: [],
	timestamp: String,
	id: Number
});

const Cart = mongoose.model('Cart', CartsSchema);

module.exports = Cart;