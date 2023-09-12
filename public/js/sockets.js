
const socket = io();

const saveProd = (title, description, img, price, stock)=>{
    socket.emit("clientNewProd", {
        title: title,
        description: description,
        img: img,
        price : price,
        stock : stock
    })
}

const deleteProd = (id)=>{
    socket.emit("clientDeleteProd", id)
}

socket.on("serverNewProd", appendProd)

socket.on("serverLoadProd", renderProd)

