const socket = io();

/* 

socket.on("evento_individual", data =>{
    msj("evento_individual", data);
})
socket.on("evento_para_el_resto", data =>{
    msj("evento_para_el_resto", data);
})

const  msj = (...mensajes)=>{
    const msjs = mensajes.join("")
    const div = document.querySelector("#mensajes")
    const p = document.querySelector("p")
    p.innerHTML = msjs
    div.appendChild(p)
}


function msgPrueba(){
    socket.emit("prueba_emit", "/ data front end")
} */