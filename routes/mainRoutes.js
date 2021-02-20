const bodyParser = require("body-parser")
const route = require("express").Router();
const mainControllers = require("../controllers/mainControllers")

const urlEncoded = bodyParser.urlencoded({
    extended: true
})

route.get("/", mainControllers.index)

route.get("/movie/:id", mainControllers.movieDetail)

route.get("/tv/:id", mainControllers.tvDetail)

route.post("/search", urlEncoded, mainControllers.search)

module.exports = route;