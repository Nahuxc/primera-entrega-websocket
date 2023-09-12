const express = require("express");
const routerViews = express.Router();
const{ProductManager} = require("../controller/ProductManager");


routerViews.get('/', async (req, res) => {
    res.render("index", {style: "index",})
});

routerViews.get('/products', async (req, res) => {
    const prod = await ProductManager.getProducts()
    res.render("home", {
        style: "index",
        prod
    })
});

routerViews.get('/realTimeProducts', async (req, res) => {
    const prod = await ProductManager.getProducts()
    res.render("realTimeProducts", {
        style: "index",
        prod
    })
});



module.exports = {
    routerViews,
};