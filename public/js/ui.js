const cards = document.querySelector("#cards")

const prodUI = (prod) => {

    const div = document.createElement("div")

    div.innerHTML = `
    <div class="div-2">
        <div class="box-2">
            <div class="div-titule-2">
                <h1>${prod.title} </h1>
            </div>
            <p>${prod.description} </p>
            <p>${prod.img} </p>
            <p>${prod.price} </p>
            <p>${prod.stock} </p>
        </div>
        <div class="div-btn">
            <button class="btn-delete" data-id="${prod.id}">Eliminar</button>
        </div>
    </div>`

    const btndelete = div.querySelector(".btn-delete")
    btndelete.addEventListener("click", () => {
        deleteProd(btndelete.dataset.id)
    })

    return div
}
const appendProd = (prod) => {
    cards.append(prodUI(prod))
}

const renderProd = async (prods) => {
    cards.innerHTML = ``
    prods.forEach(element => {
        cards.append(prodUI(element))
    });
}




