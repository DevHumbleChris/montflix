require("colors");
require("dotenv").config();
const axios = require("axios")

module.exports = {
    index: async (req, res) => {
        const response = await axios.get(process.env.MOVIES_POPULAR)
        const popularMovies = response.data
        res.render("index",{
            popularMovies,
        })
    }
}