const bodyParser = require("body-parser")
const route = require("express").Router();
const mainControllers = require("../controllers/mainControllers")

const urlEncoded = bodyParser.urlencoded({
    extended: true
})

route.get("/", mainControllers.index)

route.post("/", urlEncoded)

module.exports = route;