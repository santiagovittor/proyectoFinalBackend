const fs = require('fs');
const pathToProducts = './files/productos.json';


const fetch = async () => {
    let data = await fs.promises.readFile(pathToProducts, 'utf-8');
    let products = JSON.parse(data);
    return products
}

const setTimeStamp = (product) => {
    let date = new Date();
    let timeNow = date.toLocaleString();
    product.timestamp = timeNow;
}


class ProductsManager {


    add = async (product,isAdmin,path,method) => {

        if (isAdmin) {
            if (fs.existsSync(pathToProducts)) {
            if (!product.nombre || !product.descripcion || !product.codigo || !product.foto || !product.precio || !product.stock) return { status: "error", error: "Missing fields" }
            try {
                let products = await fetch();

                // if there is a file but it's empty we'll start from here

                if (products.length === 0) {
                    product.id = 1;
                    setTimeStamp(product)
                    await fs.promises.writeFile(pathToProducts, JSON.stringify([product], null, 2))
                    return { status: 'Success', message: "New product added." }
                }

                // if there is a file and it already has one or more product we'll start from here

                if (products.some(e=>e.nombre===product.nombre)){
                    return {status: 'Error', message: `This product already exists.`}
                }

                product.id = products[products.length - 1].id + 1;
                setTimeStamp(product)
                products.push(product);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
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
            await fs.promises.writeFile(pathToProducts, JSON.stringify([product], null, 2))
            return { status: 'Success', message: "First product added." }
        }
        catch (error) {
            return { status: 'Error', error: error }

        }}
        return {error:-1 , descripcion: `Ruta ${path} método ${method} no autorizada con sus credenciales. `}

    }


    getAll = async () => {

        if (fs.existsSync(pathToProducts)) {
            try {
                let products = await fetch();
                return { status: 'Success', payload: products }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }

    }


  
    getById = async (id)=>{
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data)
            let productByID = products.find(p => p.id === id)
            if (productByID) return { status: "success", product: productByID }
            else return { status: "error", message: "Product not found." }
        }

    }


    deleteById = async (id,isAdmin,path,method) => {
        
        if(isAdmin){
        try {
            if (!id) return { status: "error", message: "ID needed" }
            if (fs.existsSync(pathToProducts)) {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8')
                let products = JSON.parse(data)
                let newProducts = products.filter(product => product.id !== id)
                if (newProducts.length === products.length) {
                    return { status: 'error', message: "Can't find the product ID." }
                }
                await fs.promises.writeFile(pathToProducts, JSON.stringify(newProducts, null, 2))
                return { status: 'success', message: "Product deleted." }
            }

        } catch (error) {
            return { status: 'error', message: error }
        }
    }
    return {error:-1 , descripcion: `Ruta ${path} método ${method} no autorizada con sus credenciales. `}


    }


    deleteAll = async () => {
        if (fs.existsSync(pathToProducts)) {
            let newProducts = [];
            await fs.promises.writeFile(pathToProducts, JSON.stringify(newProducts))
            return { status: "success", payload: "Products deleted succesfully." }
        }

    }


}

module.exports = ProductsManager;