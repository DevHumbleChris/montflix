require("colors");
require("dotenv").config();
const axios = require("axios")

module.exports = {
    index: async (req, res) => {
        let pageNo = Math.floor(Math.random() * 3)
        if(pageNo == 0) pageNo = pageNo + 1; 
        try{

            // @ Get Popular On Theatres
            const responseMoviesPopular = await axios.get(`${process.env.MOVIES_POPULAR}${pageNo}`)
            const popularMovies = responseMoviesPopular.data
    
            // @ Get Popular On Tv
            const responseTvPopular = await axios.get(`${process.env.TV_POPULAR}${pageNo}`)
            const popularOnTv = responseTvPopular.data
    
            res.render("index",{
                popularMovies,
                popularOnTv,
            })
        }catch(err){
            console.log("An Error Occurred While Fetching Data.")
            console.log(err.message)
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

            // @ Get YouTube Videos Key.
            const responseYouTubeKeys = await axios.get(`${process.env.VIDEO_DB_URL}${id}${process.env.VIDEOS_REST_URL}`)
            const youTubeKeys = responseYouTubeKeys.data

            const results = youTubeKeys.results
            let key = []
            for( let x = 0; x < results.length; x++){
                if(results[x].type == "Trailer"){
                    key.push(results[x].key)
                }
            }
            res.render("movie_detail",{
                movieDetails,
                similarMovies,
                movieCredits,
                youTubeKey: key[0] || results[0].key
            })

        }catch(err){
            console.log("Error Occurred While Fetching The Data")
            console.log(err.message)
        }
    },
    tvDetail: async (req, res) => {
        const id = req.params.id

        try{
            // @ Get Tv Details. 
            const responseTvDetails = await axios.get(`${process.env.TV_DETAILS_URL}${id}${process.env.TV_DETAILS_REST_URL}`)
            const TvDetails = responseTvDetails.data

            // @ Get Aggregate Credits. 
            const responseAggregateCredits = await axios.get(`${process.env.AGGREGATE_CREDITS}${id}${process.env.AGG_CREDIT_URL}`)
            const tvCredits =responseAggregateCredits.data
    
            res.render("tv_detail", {
                TvDetails,
                tvCredits
            })

        }catch(err){
            console.log(err.message)
        }
        console.log(`${process.env.AGGREGATE_CREDITS}${id}${process.env.AGG_CREDIT_URL}`)
    }
}