const express = require('express');
const productsRouter = express.Router();
const ProductsManager = require('../managers/ProductManager.js');
const productService = new ProductsManager();
let isAdmin = true;

productsRouter.get('/', async (req,res)=>{
    let products = await productService.getAll();
    res.send(products.payload)
})

productsRouter.get('/:id', async (req,res)=>{
    let searchId = parseInt(req.params.id);
    let productToFind = await productService.getById(searchId)
    res.send(productToFind.product)
})



productsRouter.post('/', async (req,res)=>{
    let product = req.body;
    let path = req.path;
    let method = req.method;
    if (!product) return res.status(500).send({error:"Couldn't add product"});
    await productService.add(product,isAdmin,path,method).then(result=>res.send(result))
})


productsRouter.delete('/:id', async (req,res)=>{
    let path = req.path;
    let method = req.method;
    let idToDelete = parseInt(req.params.id);
    let productToDelete = await productService.deleteById(idToDelete,isAdmin,path,method)
    res.send(productToDelete)
})


module.exports = productsRouter;