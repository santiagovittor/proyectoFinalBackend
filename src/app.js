const express = require('express');
const { dbToUse } = require('./daos')
const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, () => console.log(`Now listening on port ${PORT}, the current persistence is ${dbToUse}`));

const productsRouter = require('./routes/productsRouter.js');
const cartsRouter = require('./routes/cartsRouter.js');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);

app.use(function (req, res, next) {
    res.status(404);
    let path = req.path;
    let method = req.method;
    res.send({ error: -2, descripcion: `Ruta "${path}" método "${method}" no implementados` })
})