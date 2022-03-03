const fs = require('fs');
const pathToCarts = './files/carritos.json';

const fetch = async () => {
    let data = await fs.promises.readFile(pathToCarts, 'utf-8');
    let carts = JSON.parse(data);
    return carts
}
const setTimeStamp = (cart) => {
    let date = new Date();
    let timeNow = date.toLocaleString();
    cart.timestamp = timeNow;
}


class CartsManager {

    create = async(cart) =>{
        if (fs.existsSync(pathToCarts)) {
            try{
                let carts = await fetch();
                if (carts.length === 0) {
                    if (!cart.productos) cart.productos = [];
                    cart.id = 1;
                    setTimeStamp(cart)
                    await fs.promises.writeFile(pathToCarts, JSON.stringify([cart], null, 2))
                    return { status: 'Success', message: "New cart added." }
                }
                if (!cart.productos) cart.productos = [];

                cart.id = carts[carts.length - 1].id + 1;
                setTimeStamp(cart)
                carts.push(cart);
                await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2))
                return { status: 'Success', message: 'Another cart added.' }

            }
            catch(error){
                return {error : "Error", message: error}
            }
        }
        try {
            if (!cart.productos) cart.productos = [];
            cart.id = 1;
            setTimeStamp(cart)
            await fs.promises.writeFile(pathToCarts, JSON.stringify([cart], null, 2))
            return { status: 'Success', message: "First cart added." }
        }
        catch (error) {
            return { status: 'Error', error: error }

        }

    }

    deleteById = async (id) => {
        try {
            if (!id) return { status: "error", message: "ID needed" }
            if (fs.existsSync(pathToCarts)) {
                let data = await fs.promises.readFile(pathToCarts, 'utf-8')
                let carts = JSON.parse(data)
                let newCarts = carts.filter(cart => cart.id !== id)
                if (newCarts.length === carts.length) {
                    return { status: 'error', message: "Can't find the cart ID." }
                }
                await fs.promises.writeFile(pathToCarts, JSON.stringify(newCarts, null, 2))
                return { status: 'success', message: "Cart deleted." }
            }

        } catch (error) {
            return { status: 'error', message: error }
        }

    
    }

    getById = async (id) => {
        if (fs.existsSync(pathToCarts)) {
            let data = await fs.promises.readFile(pathToCarts, 'utf-8')
            let carts = JSON.parse(data)
            let cartById = carts.find(p => p.id === id)
            if (cartById) return { status: "success", cart: cartById.productos }
            else return { status: "error", message: "Cart not found." }
        }
    }


    addProductToCart = async (id,product) => {
       
        try{
            if (!id) return { status: "error", message: "Cart ID needed" }
            if (!product.id) return { status: "error", message: "Please select which product's id to add." }
            if (fs.existsSync(pathToCarts)) {
                let data = await fs.promises.readFile(pathToCarts, 'utf-8')
                let carts = JSON.parse(data)
                let selectedCart = carts.find(cart => cart.id === id);
                if (!selectedCart) {
                    return { status: 'error', message: "Can't find the cart ID." }
                }
                let cartProducts = selectedCart.productos;
                cartProducts.push(product);
                await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2))
                return { status: 'success', message: "Product Added." }
            }
            return {status:'error' , message: "No carts at the moment."}
        }
        catch (error){
            return { status: 'error', message: error }
        }
    }

    deleteProductById = async (id,product) => {

        try {
            if (!id) return { status: "error", message: "Cart's ID needed" }
            if (!product) return {status: "error", message: "Product's ID needed"}
            if (fs.existsSync(pathToCarts)) {
                let data = await fs.promises.readFile(pathToCarts, 'utf-8')
                let carts = JSON.parse(data)
                let selectedCart = carts.find(cart => cart.id === id);
                if (!selectedCart) {
                    return { status: 'error', message: "Can't find the cart ID." }
                }
                let cartProducts = selectedCart.productos;
                let newCartProducts = cartProducts.filter(items => items.id !== product)
                if (newCartProducts.length === cartProducts.length) {
                    return { status: 'error', message: "Can't find the product ID." }
                }
                selectedCart.productos = newCartProducts;
                await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, 2))
                return { status: 'success', message: "Product deleted." }
            }

        } catch (error) {
            return { status: 'error', message: error }
        }


    }

    

   


}

module.exports = CartsManager;