require("colors");
require("dotenv/config");

module.exports = {
    index: (req, res) => {
        res.render("index", {
            message: "Welcome To Montflix"
        })
    }
}