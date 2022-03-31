const express = require('express');
const productsRouter = express.Router();
const { productDao } = require('../daos')

let isAdmin = true;

productsRouter.get('/', async (req, res) => {
    let products = await productDao.getAll();
    res.send(products)
})

productsRouter.get('/:id', async (req, res) => {
    let searchId = parseInt(req.params.id);
    let productToFind = await productDao.getById(searchId)
    res.send(productToFind.product)
})



productsRouter.post('/', async (req, res) => {
    let product = req.body;
    let path = req.path;
    let method = req.method;
    if (!product) return res.status(500).send({ error: "Couldn't add product" });
    await productDao.addProduct(product, isAdmin, path, method).then(result => res.send(result));
})


productsRouter.delete('/:id', async (req, res) => {
    let path = req.path;
    let method = req.method;
    let idToDelete = parseInt(req.params.id);
    let productToDelete = await productDao.deleteById(idToDelete, isAdmin, path, method)
    res.send(productToDelete);
})


productsRouter.delete('/', async (req, res) => {
    let armageddon = await productDao.deleteAll()
    res.send(armageddon)
})

module.exports = productsRouter;