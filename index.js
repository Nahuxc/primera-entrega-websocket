const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const {routerCart} = require("./routes/cart.route")
const {routerProduct} = require("./routes/product.route")
const { routerViews } = require("./routes/views.router")
const helpers = require("./lib/helpers.handlebars")
const {create} = require("express-handlebars")
const { configureSocket } = require("./views/socket/configure-socket")

const hbs = create({
    partialsDir: [
        "views/partials"
    ],
    helpers
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
/* cookies */
app.use(cookieParser())

/* config handlebars */
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")

app.use(express.static(__dirname + "/public"))

/* routes */
app.use("/", routerViews)
app.use("/api/carts", routerCart)
app.use("/api/products", routerProduct)


app.use((err, req, res, next)=>{
    console.log({err});
    res.status(500).send({error: "error del servidor no controlado"})
})


const PORT = 8080
const httpServer = app.listen(PORT, ()=>{
    console.log(`servidor funcionando en http://localhost:${PORT}`);
})

configureSocket(httpServer)


