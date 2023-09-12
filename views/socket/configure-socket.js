const {Server} = require("socket.io")
const {ProductManager} = require("../../controller/ProductManager")

function configureSocket(httpServer){


    const socketServer = new Server(httpServer)
    socketServer.on("connection", async (socket)=>{

        console.log("funcionando socket");
        const productos = await ProductManager.getProducts()
        socketServer.emit("serverLoadProd", productos )

        socket.on("clientNewProd", async data =>{
            const producto = {...data}
            const añadir = await ProductManager.save(producto)
            console.log(`se creo el producto ${añadir}`);
            socketServer.emit("serverNewProd", producto)
        })
        socket.on("clientDeleteProd", async (prodId) =>{
            const prodById =  await productos.filter((prod) => prod.id == prodId);
            productos.splice(prodById, 1)
            await ProductManager.writeProducts(productos)
            socketServer.emit("serverLoadProd", productos)

        })
    })


}

module.exports = {
    configureSocket
}