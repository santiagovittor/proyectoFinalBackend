const FsManager = require('../../managers/FsManager.js');
const fs = require('fs');
const path = require('path')
const cartsPath = path.join('files', 'carritos.json')

const setTimeStamp = (cart) => {
    let date = new Date();
    let timeNow = date.toLocaleString();
    cart.timestamp = timeNow;
}


class CartDaoArchivos {

    cartManager = new FsManager(cartsPath);

    async getAll() {
        return await this.cartManager.getAll();
    }

    async getById(id) {
        return await this.cartManager.getById(id);
    }

    async deleteById(id, isAdmin, path, method) {
        return await this.cartManager.deleteById(id, isAdmin, path, method);
    }

    async deleteAll() {
        return await this.cartManager.deleteAll();
    }


    create = async (cart) => {
        if (fs.existsSync(cartsPath)) {
            try {
                let data = await fs.promises.readFile(cartsPath, 'utf-8');
                let carts = JSON.parse(data);
                if (carts.length === 0) {
                    if (!cart.productos) cart.productos = [];
                    cart.id = 1;
                    setTimeStamp(cart)
                    await fs.promises.writeFile(cartsPath, JSON.stringify([cart], null, 2))
                    return { status: 'Success', message: "New cart added." }
                }
                if (!cart.productos) cart.productos = [];

                cart.id = carts[carts.length - 1].id + 1;
                setTimeStamp(cart)
                carts.push(cart);
                await fs.promises.writeFile(cartsPath, JSON.stringify(carts, null, 2))
                return { status: 'Success', message: 'Another cart added.' }

            }
            catch (error) {
                return { error: "Error", message: error }
            }
        }
        try {
            if (!cart.productos) cart.productos = [];
            cart.id = 1;
            setTimeStamp(cart)
            await fs.promises.writeFile(cartsPath, JSON.stringify([cart], null, 2))
            return { status: 'Success', message: "First cart added." }
        }
        catch (error) {
            return { status: 'Error', error: error }

        }

    }

    addProductToCart = async (id, product) => {

        try {
            if (!id) return { status: "error", message: "Cart ID needed" }
            if (!product || isNaN(product)) return { status: "error", message: "Please select which product's id to add." }
            if (fs.existsSync(cartsPath)) {
                let data = await fs.promises.readFile(cartsPath, 'utf-8')
                let carts = JSON.parse(data)
                let selectedCart = carts.find(cart => cart.id === id);
                if (!selectedCart) {
                    return { status: 'error', message: "Can't find the cart ID." }
                }
                let cartProducts = selectedCart.productos;
                cartProducts.push(parseInt(product));
                await fs.promises.writeFile(cartsPath, JSON.stringify(carts, null, 2))
                return { status: 'success', message: "Product Added." }
            }
            return { status: 'error', message: "No carts at the moment." }
        }
        catch (error) {
            return { status: 'error', message: error }
        }
    }


    deleteProductById = async (id, product) => {

        try {
            if (!id) return { status: "error", message: "Cart's ID needed" }
            if (!product) return { status: "error", message: "Product's ID needed" }
            if (fs.existsSync(cartsPath)) {
                let data = await fs.promises.readFile(cartsPath, 'utf-8')
                let carts = JSON.parse(data)
                let selectedCart = carts.find(cart => cart.id === id);
                if (!selectedCart) {
                    return { status: 'error', message: "Can't find the cart ID." }
                }
                let cartProducts = selectedCart.productos;
                let newCartProducts = cartProducts.filter(items => items !== product)
                if (newCartProducts.length === cartProducts.length) {
                    return { status: 'error', message: "Can't find the product ID." }
                }
                selectedCart.productos = newCartProducts;
                await fs.promises.writeFile(cartsPath, JSON.stringify(carts, null, 2))
                return { status: 'success', message: "Product deleted." }
            }

        } catch (error) {
            return { status: 'error', message: error }
        }


    }


}

module.exports = CartDaoArchivos;