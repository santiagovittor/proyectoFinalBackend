const express = require('express');
const cartsRouter = express.Router();
const CartsManager = require('../managers/CartManager.js');
const cartService = new CartsManager();


cartsRouter.get('/:id/productos', async (req,res)=>{
    let searchId = parseInt(req.params.id);
    let cartToFind = await cartService.getById(searchId)
    res.send(cartToFind.cart)
})

cartsRouter.post('/', async (req,res)=>{
    let cart = req.body;
    if (!cart) return res.status(500).send({error:"Couldn't add product"});
    await cartService.create(cart).then(result=>res.send(result))
})

cartsRouter.delete('/:id', async (req,res)=>{
    let idToDelete = parseInt(req.params.id);
    let cartToDelete = await cartService.deleteById(idToDelete)
    res.send(cartToDelete)
})


cartsRouter.post('/:id/productos',async (req,res)=>{
    let cartId = parseInt(req.params.id);
    let productToAdd = req.body;
    await cartService.addProductToCart(cartId,productToAdd).then(result=> res.send(result))
})

cartsRouter.delete('/:id/productos/:id_prod',async(req,res)=>{
    let cartId = parseInt(req.params.id);
    let productToDelete = parseInt(req.params.id_prod);
    await cartService.deleteProductById(cartId,productToDelete).then(result=> res.send(result))
})




module.exports = cartsRouter;