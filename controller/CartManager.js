const fs = require('fs');
const path = require('path')
const filepath = path.resolve(__dirname, "../database/cart.json")
const { ProductManager } = require("../controller/ProductManager")

class Contenedor {
    constructor(path) {
        this.path = path;
        this.quantity = 1
    }

    async validateExistFile() {
        try {
            await fs.promises.stat(`${this.path}`)
        } catch (err) {
            await fs.promises.writeFile(`${this.path}`, JSON.stringify([]));
        }
    }

    async readFileFn() {
        await this.validateExistFile();
        const contenido = await fs.promises.readFile(`${this.path}`, 'utf-8');
        return JSON.parse(contenido);
    }

    async writeProducts(productos) {
        await this.validateExistFile();
        const data = JSON.stringify(productos, null, 4)
        await fs.promises.writeFile(this.path, data)
    }

    async getAllProdInCart() {
        try {
            const data = await this.readFileFn();
            return data

        } catch(error) {
            console.log(error);
        }
    }

    async addProdInCart(prodId) {
        try {
            const data = await this.readFileFn()
            const cart = await this.getAllProdInCart()
            const prodCartId = cart.findIndex(producto => producto.id == prodId)
            const productos = await ProductManager.getProducts()
            const productoId = productos.findIndex(producto => producto.id == prodId)
            const prod = productos[productoId]


            if(cart[prodCartId]){
                /* si el producto existe en el cart va a aumentar su cantidad sin generar otro producto por separado */
                this.updateQuantity(prodId)
            }else if(!cart[prodCartId]){
                /* creo un objeto que contenga solo el id y la cantidad del producto asi no traigo todo el producto entero */
                const prodCart = {
                    id: prod.id,
                    quantity: this.quantity = 1
                }

                /* añado el objeto adentro del carrito */
                data.push(prodCart)
                await this.writeProducts(data)
            }

            /* devuelvo la cantidad de productos del carrito */
            return this.quantity;

        } catch (err) {
            throw new Error("No se pudo agregar el producto al carrito", err)
        }
    }
    async updateQuantity(id) {
        const prodCart = await this.getAllProdInCart()
        const prodCartId = prodCart.findIndex(producto => producto.id == id)
        const prodOld = prodCart[prodCartId]
        this.quantity++

        const productoMod = {
            id: prodOld.id,
            quantity: this.quantity
        }

        prodCart.splice(prodCartId, 1, productoMod)
        /* reescribe el producto con la nueva cantidad añadida del mismo */
        await this.writeProducts(prodCart)
        return productoMod

    }
}

const instanciaCartApi = new Contenedor(filepath)

module.exports = {
    CartManager: instanciaCartApi
}