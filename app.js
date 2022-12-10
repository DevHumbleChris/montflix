require("dotenv/config");
require("colors");
const express = require("express")
const morgan = require("morgan")
const path = require("path")
const ip = require('ip').address()

const app = express()
const PORT = process.env.PORT ?? 3000
const mainRoutes = require("./routes/mainRoutes")
const mainControllers = require("./controllers/mainControllers")

// @ Middlewares.
app.use("/", mainRoutes)
app.use(morgan("tiny"))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static("public"))

// @ Error Handlers.
app.use(mainControllers.error404)
app.use(mainControllers.error500)

app.listen(PORT, () => {
    console.log(ip)
    console.log(`
    Montflix Started at http://127.0.0.1:${PORT}
    ${ip && `External URL: ${ip}:${PORT}`}
    `.bold.blue)
})

module.exports = {
    app
}
