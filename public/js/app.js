const IMG_PATH = "https://image.tmdb.org/t/p/w500"
const TRENDING_TODAY = "https://api.themoviedb.org/3/trending/today/day?api_key=b9326276faf774560703e2e9152fa7e7"

const MOVIE_DETAIL_URL = "https://api.themoviedb.org/3/movie/"
const MOVIE_DETAIL_REST_URL = "?api_key=b9326276faf774560703e2e9152fa7e7&language=en-US"

let dataLength, randomPick, response, responseData;

const banner = document.querySelector(".banner");
const movieDetailBanner = document.querySelector(".movie-detail-banner")

if(banner != null){
    // @ Banner Div Setup.
    async function getImages(){
        response = await fetch(TRENDING_TODAY)
        responseData = response.json()

        responseData.then( (data) => {
            dataLength = data.results.length
            randomPick = Math.floor(Math.random() * dataLength)
            console.log(randomPick)
            console.log(dataLength)
            banner.style = `
                            background-image:url(${IMG_PATH}${data.results[randomPick].backdrop_path});
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            `
        })
    }
    getImages()
}
if(movieDetailBanner != null){
    async function getDetailMovieImage(){
        const pathname = window.location.pathname
        const id = pathname.split("/")[2]
        response = await fetch(`${MOVIE_DETAIL_URL}${id}${MOVIE_DETAIL_REST_URL}`)
        responseData = response.json()

        responseData.then( (data) => {
            movieDetailBanner.style = `
                            background-image:url(${IMG_PATH}${data.poster_path});
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            `
        console.log(data)
            
        })
    }
    getDetailMovieImage()
}
