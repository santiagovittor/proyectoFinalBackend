const MongoManager = require('../../managers/MongoManager.js')
const Product = require('../../models/product.js')


const setTimeStamp = (product) => {
    let date = new Date();
    let timeNow = date.toLocaleString();
    product[0].timestamp = timeNow;
}





class MongoProductDao {
    productManager = new MongoManager(Product);

    async getAll() {
        return await this.productManager.getAll();
    }

    async getById(id) {
        return await this.productManager.getById(id);
    }

    async deleteById(id, isAdmin, path, method) {
        return await this.productManager.deleteByID(id, isAdmin, path, method)
    }

    async deleteAll() {
        await this.productManager.deleteAll()
    }

    async addProduct(product, isAdmin, path, method) {

        if (isAdmin) {
            if (Product) {
                if (!product[0].name || !product[0].code || !product[0].description || !product[0].thumbnail || !product[0].price || !product[0].stock) {
                    return { status: "error", error: "Missing fields" }
                }
                try {
                    let products = await this.productManager.getAll()
                    if (products.length === 0) {
                        product[0].id = 1;
                        console.log(product)
                        setTimeStamp(product)
                        await this.productManager.add(product[0])
                        return { status: 'Success', message: "New product added." }
                    }
                    if (products.some(e => e.name === product[0].name)) {
                        return { status: 'Error', message: `This product already exists.` }
                    }
                    product[0].id = products[products.length - 1].id + 1;
                    setTimeStamp(product)
                    await this.productManager.add(product[0])
                    return { status: 'Success', message: 'Another product added.' }

                }
                catch (err) {
                    return { status: 'Error', error: error }
                }
            }
        }
        return { error: -1, descripcion: `Ruta ${path} método ${method} no autorizada con sus credenciales. ` }

    }

}

module.exports = MongoProductDao;