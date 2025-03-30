document.getElementById('searchButton').addEventListener('click',buscarPeliculas)
const api_key = 'b6d1a855134ef5704ab442947dac9d8f'
const urlBase = 'https://api.themoviedb.org/3'
const urlImagen = 'https://image.tmdb.org/t/p/w200'

let resultContainer = document.getElementById('results')

function buscarPeliculas() {
    let searchInput = document.getElementById('searchInput').value
    resultContainer.innerHTML = 'Cargando...'
    fetch(`${urlBase}/search/movie?api_key=${api_key}&query=${searchInput}&language=es`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
}

function displayMovies(movies){
    
    resultContainer.innerHTML = ''

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para la búsqueda</p>'
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = `Fecha de lanzamiento: ${movie.release_date}`

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImagen + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultContainer.appendChild(movieDiv)

    })
}