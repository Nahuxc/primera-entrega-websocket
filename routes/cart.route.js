const express = require("express");
const routerCart = express.Router();
const { CartManager } = require('../controller/CartManager');



routerCart.get('/', async (req, res) => {
    const cartProd = await CartManager.getAllProdInCart()
    res.status(200).json(cartProd)
});

routerCart.get('/:cid', async (req, res) => {
    const cartProd = await CartManager.getAllProdInCart()
    const {cid} = req.params
    const cartProdId = cartProd.find((prodCart)=> prodCart.productoCart.id === +cid)
    if(cartProdId){
        res.status(200).json(cartProdId)
    }else{
        res.status(404).json({mensaje: "product not found"})
    }

});


routerCart.post('/:cid/products', async (req, res) => {
    try {
        const {cid} = req.params
        let response = await CartManager.addProdInCart(cid)
        res.status(200).json({ msg: `Producto guardado en el carrito tu cantidad es ${response}` });
        return response

    } catch (err) {
        res.status(404).json(err)
    }

});


module.exports = {
    routerCart,
};