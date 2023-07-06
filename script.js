const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b90543c8cf99cd8641562ca00ce2137c&page=1'
const IMG_URL = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=b90543c8cf99cd8641562ca00ce2137c&query="'

const form = document.getElementById('form')
const search = document.querySelector('.search')
const main = document.getElementById('main')

const getClassByRate = (rate) =>{
    if(rate >= 8) return 'green'
    else if(rate >=6) return 'orange'
    else return 'red'
}

const showInDom = (results) =>{
    main.innerHTML = ''
    
    results.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
            <img src="${IMG_URL + poster_path}">
            <div class="movieinfo">
                <h3>${title}</h3>
                <p class="rating ${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</p>
            </div>
            <div class="overview">
                ${overview}
            </div>
        `
        main.appendChild(movieElement)
    });
}

getMovies(API_URL)

async function getMovies (url) {
    const res = await fetch(url)
    const data = await res.json()

    showInDom(data.results)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
    } else window.location.reload()
})