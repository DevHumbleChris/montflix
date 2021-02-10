require("colors");
require("dotenv").config();
const axios = require("axios")

module.exports = {
    index: async (req, res) => {

        try{

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
        }catch(err){
            console.log("An Error Occurred While Fetching Data.")
        }

    },
    movieDetail: async (req, res) => {
        const id = req.params.id

        try{
            // @ Get Movie Details
            const responseMovieDetail = await axios.get(`${process.env.MOVIE_DETAIL_URL}${id}${process.env.MOVIE_DETAIL_REST_URL}`)
            const movieDetails = responseMovieDetail.data

            // @ Get Similar Movies. 
            const responseSimilarMovies = await axios.get(`${process.env.MOVIE_DETAIL_URL}${id}${process.env.MOVIE_DETAIL_SIMILAR_URL}`)
            const similarMovies = responseSimilarMovies.data

            // @ Get Movie Credits. 
            const responseMovieCredits = await axios.get(`${process.env.MOVIE_DETAIL_URL}${id}${process.env.MOVIE_DETAIL_CREDITS}`)
            const movieCredits = responseMovieCredits.data

            res.render("movie_detail",{
                movieDetails,
                similarMovies,
                movieCredits
            })

        }catch(err){
            console.log("Error Occurred While Fetching The Data")
        }

        console.log(`${process.env.MOVIE_DETAIL_URL}${id}${process.env.MOVIE_DETAIL_REST_URL}`)
    },
    tvDetail: (req, res) => {
        const id = req.params.id

        res.render("tv_detail", {
            
        })
    }
}