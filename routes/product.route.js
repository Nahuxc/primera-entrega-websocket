const express = require("express");
const routerProduct = express.Router();
const {uploader} = require("../utils/uploader")
const {ProductManager} = require("../controller/ProductManager")

/* ver todos los productos */
routerProduct.get("/", async(req, res)=>{
    const product = await ProductManager.getProducts()
    const {limit} = req.query
    if(limit){
        res.json(product.slice(0, limit))
    }
    else{
        res.json(product)
    }
})

/* ver los productos por ID */
routerProduct.get("/:pid", async(req, res)=>{
    const products =  await ProductManager.getProducts()
    const {pid} = req.params
    const product = products.find(product => product.id == pid)
    if(product){
        res.status(200).json(product)
    }else{
        res.status(404).json({mensaje: "product not found"})
    }
})

/* crear producto con imagen */
routerProduct.post('/',uploader.single("img"), async (req, res) => {
    try {
        const producto = req.body
        const file = req.file?.filename
        const productoFile = {...producto, img: file}
        const añadir = await ProductManager.save(productoFile)
        if(añadir == undefined){
            res.status(404).json({msg: `no se pudo crear su producto, complete todos los campos`})
        }else{
            res.status(200).json({msg: `producto creado con su id ${añadir}`})
        }
    } catch (error) {
        res.status(404).json(error)
    }
});


/* actualizar producto */
/* deberas crear tu producto por postman y enviarlo, con los datos que pida:
        "id": 1,
        "title": "",
        "description": "",
        "price": ,
        "stock": ,
        "img": ""
*/
routerProduct.put("/:pid", async(req, res) =>{
    try {
        const {pid} = req.params
        const body = req.body
        let data = await ProductManager.updateProduct(pid, body)

        res.status(200).json(data);

    } catch (err) {
        res.status(404).json(err);
    }
})

/* eliminar producto */
routerProduct.delete("/:pid", async(req, res)=>{
    try {
        const {pid} = req.params
        await ProductManager.deleteById(+pid)

        res.status(200).json({ message: 'Producto eliminado' })

    } catch (err) {
        res.status(404).json(err)
    }

})



module.exports ={
    routerProduct
};