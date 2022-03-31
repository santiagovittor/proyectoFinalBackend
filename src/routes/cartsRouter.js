const express = require('express');
const cartsRouter = express.Router();
const { cartDao } = require('../daos')
let isAdmin = true;


cartsRouter.get('/:id/productos', async (req, res) => {
    let searchId = parseInt(req.params.id);
    let cartToFind = await cartDao.getById(searchId)
    res.send(cartToFind)
})

cartsRouter.post('/', async (req, res) => {
    let cart = req.body;
    if (!cart) return res.status(500).send({ error: "Couldn't add cart" });
    await cartDao.create(cart).then(result => res.send(result))
})

cartsRouter.delete('/:id', async (req, res) => {
    let idToDelete = parseInt(req.params.id);
    let path = req.path;
    let method = req.method;
    let cartToDelete = await cartDao.deleteById(idToDelete, isAdmin, path, method)
    console.log(cartToDelete)
    res.send(cartToDelete)
})

cartsRouter.delete('/', async (req, res) => {
    let armageddon = await cartDao.deleteAll()
    res.send(armageddon)
})


cartsRouter.post('/:id/productos', async (req, res) => {
    let cartId = parseInt(req.params.id);
    let productToAdd = req.body;
    console.log(productToAdd)
    if (!productToAdd) return res.status(500).send({ error: "Couldn't add product" });
    await cartDao.addProductToCart(cartId, productToAdd).then(result => res.send(result))
})

cartsRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    let cartId = parseInt(req.params.id);
    let productToDelete = parseInt(req.params.id_prod);
    await cartDao.deleteProductById(cartId, productToDelete).then(result => res.send(result))
})




module.exports = cartsRouter;