const MongoManager = require('../../managers/MongoManager.js')
const Cart = require('../../models/cart.js')


const setTimeStamp = (element) => {
	let date = new Date();
	let timeNow = date.toLocaleString();
	element.timestamp = timeNow;
}


class MongoCartDao {
	cartManager = new MongoManager(Cart);

	async getAll() {
		return await this.cartManager.getAll();
	}

	async getById(id) {
		return await this.cartManager.getById(id);
	}

	async add(cart) {
		setTimeStamp(cart)
		return await this.cartManager.add(cart);
	}

	async deleteById(id, isAdmin, path, method) {
		return await this.cartManager.deleteByID(id, isAdmin, path, method)
	}

	async deleteAll() {
		return await this.cartManager.deleteAll()
	}

	async addProductToCart(id, product) {
		return await this.cartManager.addProductToCart(id, product)
	}

	async deleteProductById(id, product) {
		return await this.cartManager.deleteProductInCartById(id, product)
	}


	create = async (cart) => {
		try {
			let data = await this.getAll()
			if (data.length === 0) {
				if (!cart.productos) cart.productos = [];
				cart.id = 1;
				setTimeStamp(cart)
				await this.cartManager.add(cart)
				return { status: 'Success', message: "New cart added." }
			}
			if (!cart.productos) cart.productos = [];
			cart.id = data[data.length - 1].id + 1;
			setTimeStamp(cart)
			data.push(cart);
			await this.cartManager.add(cart)
			return { status: 'Success', message: 'Another cart added.' }

		}
		catch (err) {
			console.log(err)
		}
	}



}

module.exports = MongoCartDao;