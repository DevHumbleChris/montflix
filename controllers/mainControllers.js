require("colors");
require("dotenv").config();
const axios = require("axios")

module.exports = {
    index: async (req, res) => {

        // @ Get Popular On Theatres
        const responseMoviesPopular = await axios.get(process.env.MOVIES_POPULAR)
        const popularMovies = responseMoviesPopular.data

        // @ Get Popular On Tv
        const responseTvPopular = await axios.get(process.env.TV_POPULAR)
        const popularOnTv = responseTvPopular.data

        res.render("index",{
            popularMovies,
            popularOnTv,
        })
    }
}