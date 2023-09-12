
const form = document.querySelector("#form-generator")
const title = document.querySelector("#title")
const description = document.querySelector("#description")
const img = document.querySelector("#img")
const price = document.querySelector("#price")
const stock = document.querySelector("#stock")



form.addEventListener("submit", e=>{
    e.preventDefault()

    saveProd(title.value, description.value, img.value, price.value, stock.value)

})







