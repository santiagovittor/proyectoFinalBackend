require('dotenv').config();
const { mongoose } = require('mongoose');

mongoose.connect(
	'mongodb+srv://Santiago:Coder1234@ecommercecoderback.j2ab0.mongodb.net/ecommerce?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to mongoDB');
});

class MongoManager {

	constructor(model) {
		this.model = model;
	}

	async getAll() {
		return await this.model.find();
	}

	async getById(id) {
		let result = await this.model.find({ id: id })
		if (result.length > 0) return { status: "Success", payload: result }
		return { status: "Error", message: "No items found." }
	}

	async add(element) {
		return await this.model.create(element);
	}

	async deleteByID(id, isAdmin, path, method) {
		if (isAdmin) {
			let data = await this.model.find()
			let newData = data.filter(element => element.id != id)
			if (data.length === newData.length) {
				return { status: 'error', message: "Can't find the element ID." }
			}
			try {
				if (!id) return { status: "error", message: "ID needed" }
				await this.model.deleteOne({ id: id })
				return { status: 'success', message: "Item deleted." }
			}
			catch (err) {
				return { status: 'error', message: error }
			}
		}
		return { error: -1, descripcion: `Ruta ${path} método ${method} no autorizada con sus credenciales. ` }
	}

	async deleteAll() {
		await this.model.deleteMany()
		return { status: "Success", message: "Boom. You deleted it all. You, deleter." }
	}

	addProductToCart = async (id, product) => {
		try {
			let carts = await this.model.find()
			if (!id) return { status: "error", message: "Cart ID needed" }
			if (!product || isNaN(product)) return { status: "error", message: "Please select which product's id to add." }
			if (carts) {
				let selectedCart = await this.model.find({ id: id })
				let currentProducts = selectedCart[0].products;
				if (!selectedCart) {
					return { status: 'error', message: "Can't find the cart ID." }
				}
				if (currentProducts.length === 0) {
					await this.model.findOneAndUpdate({ id: id }, { $set: { products: product } })
					return { status: 'success', message: "First product Added." }
				}
				let toAdd = [...currentProducts, product[0]]
				await this.model.findOneAndUpdate({ id: id }, { $set: { products: toAdd } })
				return { status: 'success', message: "Product Added.", payload: toAdd }
			}
			return { status: 'error', message: "No carts at the moment." }
		}
		catch (error) {
			return { status: 'error', message: error }
		}

	}

	deleteProductInCartById = async (id, product) => {

		try {
			if (!id) return { status: "error", message: "Cart's ID needed" }
			if (!product) return { status: "error", message: "Product's ID needed" }
			let carts = this.model.find()
			if (carts) {
				let selectedCart = await this.model.find({ id: id })
				let currentProducts = selectedCart[0].products;
				if (!selectedCart) {
					return { status: 'error', message: "Can't find the cart ID." }
				}
				if (currentProducts.length === 0) {
					return { status: 'Error', message: "No products to delete.." }
				}
				let newCartProducts = currentProducts.filter(items => items !== product)
				if (currentProducts.length === newCartProducts.length) {
					return { status: 'error', message: "Can't find the product ID." }
				}
				await this.model.findOneAndUpdate({ id: id }, { $set: { products: newCartProducts } })
				return { status: 'success', message: "Product deleted.", payload: newCartProducts }
			}
		}
		catch (error) {
			return { status: "error", message: error }
		}

	}




}


module.exports = MongoManager;
