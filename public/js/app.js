const IMG_PATH = "https://image.tmdb.org/t/p/w500"
const TRENDING_TODAY = "https://api.themoviedb.org/3/trending/today/day?api_key=b9326276faf774560703e2e9152fa7e7"

const banner = document.querySelector(".banner");

// @ Banner Div Setup.
async function getImages(){
    const response = await fetch(TRENDING_TODAY)
    const responseData = response.json()

    responseData.then( (data) => {
        const dataLength = data.results.length
        const randomPick = Math.floor(Math.random() * dataLength)
        console.log(randomPick)
        console.log(dataLength)
        banner.style = `
                        background-image:url(${IMG_PATH}${data.results[randomPick].backdrop_path});
                        background-repeat: no-repeat;
                        background-attachment: fixed;  
                        background-size: cover;
                        `
    })
}

getImages()
