const FsManager = require('../../managers/FsManager.js');
const path = require('path');
const fs = require('fs');
const productsPath = path.join('files', 'productos.json')

const setTimeStamp = (product) => {
    let date = new Date();
    let timeNow = date.toLocaleString();
    product.timestamp = timeNow;
}

class ProductDaoArchivo {

    productManager = new FsManager(productsPath);

    async getAll() {
        return await this.productManager.getAll();
    }

    async getById(id) {
        return await this.productManager.getById(id);
    }

    async deleteById(id, isAdmin, path, method) {
        return await this.productManager.deleteById(id, isAdmin, path, method);
    }

    async deleteAll() {
        return await this.productManager.deleteAll();
    }

    addProduct = async (product, isAdmin, path, method) => {

        if (isAdmin) {
            if (fs.existsSync(productsPath)) {
                if (!product.nombre || !product.descripcion || !product.codigo || !product.foto || !product.precio || !product.stock) return { status: "error", error: "Missing fields" }
                try {
                    let data = await fs.promises.readFile(productsPath, 'utf-8')
                    let products = JSON.parse(data)
                    // if there is a file but it's empty we'll start from here

                    if (products.length === 0) {
                        product.id = 1;
                        setTimeStamp(product)
                        await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2))
                        return { status: 'Success', message: "New product added." }
                    }

                    // if there is a file and it already has one or more product we'll start from here

                    if (products.some(e => e.nombre === product.nombre)) {
                        return { status: 'Error', message: `This product already exists.` }
                    }

                    product.id = products[products.length - 1].id + 1;
                    setTimeStamp(product)
                    products.push(product);
                    await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2))
                    return { status: 'Success', message: 'Another product added.' }
                }
                catch (error) {
                    return { status: 'Error', error: error }
                }
            }
            // if there is no file we'll start from here
            try {
                product.id = 1;
                setTimeStamp(product)
                await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2))
                return { status: 'Success', message: "First product added." }
            }
            catch (error) {
                return { status: 'Error', error: error }

            }
        }
        return { error: -1, descripcion: `Ruta ${path} método ${method} no autorizada con sus credenciales. ` }

    }





}

module.exports = ProductDaoArchivo;