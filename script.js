const API_KEY = '53c258bb52d305146e19a71e58aa2cc5';
const BASE_URL = 'https://api.themoviedb.org/3';

// API užklausų funkcija
async function fetchFromTMDb(endpoint, query = '') {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&query=${query}`;
     // Virsutine eilute sugeneruoja panasu URL adresa https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=53c258bb52d305146e19a71e58aa2cc5

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

document.getElementById('searchPage').addEventListener('click', loadSearchPage);
document.getElementById('favoritesPage').addEventListener('click', loadFavoritesPage);


function loadSearchPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>Search Movies</h1>
        <input type="text" id="searchInput" placeholder="Enter movie title" />
        <button id="searchButton">SearAddch</button>
        <div id="movieList"></div>
    `;
    document.getElementById('searchButton').addEventListener('click', searchMovies);
}

async function searchMovies() {
    const query = document.getElementById('searchInput').value;
    const movies = await fetchFromTMDb('/search/movie', query);
    const movieList = document.getElementById('movieList');

    movieList.innerHTML = '';
    movies.results.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
            <button onclick="showMovieDetails(${movie.id})">Details</button>
        `;
        movieList.appendChild(movieItem);
    });
}

/**
 * Parodo filmo detales.
 * @param {number} movieId - Filmo ID, kurio detales norime parodyti.
 */
async function showMovieDetails(movieId) {
    // Paimame filmo detales iš TMDb API
    const movie = await fetchFromTMDb(`/movie/${movieId}`);
    
    // Gauname vietą puslapyje, kur rodysime filmo detales
    const content = document.getElementById('content');
    
    // Sukuriame HTML struktūrą filmo detalėms
    content.innerHTML = `
        <h1>${movie.title}</h1>
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
        <p>${movie.overview}</p>
        <button id="favoriteButton">
            ${isFavorite(movieId) ? "Pašalinti iš mėgstamiausių" : "Pridėti į mėgstamiausius"}
        </button>
    `;
    
    // Pridedame įvykio klausiklį prie mygtuko
    document.getElementById('favoriteButton').addEventListener('click', () => toggleFavorite(movieId));
}

/**
 * Patikrina, ar filmas yra mėgstamiausių sąraše.
 * @param {number} movieId - Filmo ID, kurį norime patikrinti.
 * @returns {boolean} - True, jei filmas yra mėgstamiausių sąraše, kitaip - false.
 */
function isFavorite(movieId) {
    // Gauti mėgstamiausius iš localStorage arba nustatyti tuščią masyvą
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(movieId);
}

/**
 * Perjungia filmo būseną mėgstamiausių sąraše.
 * @param {number} movieId - Filmo ID, kurio būseną norime perjungti.
 */
function toggleFavorite(movieId) {
    // Gauti mėgstamiausius iš localStorage arba nustatyti tuščią masyvą
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Pridėti arba pašalinti filmą iš mėgstamiausių
    if (favorites.includes(movieId)) {
        favorites = favorites.filter(id => id !== movieId);
    } else {
        favorites.push(movieId);
    }
    
    // Išsaugoti atnaujintą mėgstamiausių sąrašą į localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Atnaujinti filmo detales
    showMovieDetails(movieId);
}

/**
 * Užkrauna mėgstamiausių puslapį.
 */
async function loadFavoritesPage() {
    // Gauti mėgstamiausius iš localStorage arba nustatyti tuščią masyvą
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Gauname vietą puslapyje, kur rodysime mėgstamiausius filmus
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Mėgstamiausi</h1>';
    const movieList = document.createElement('div');
    content.appendChild(movieList);

    // Pereiname per mėgstamiausių sąrašą ir rodome kiekvieną filmą
    for (const movieId of favorites) {
        const movie = await fetchFromTMDb(`/movie/${movieId}`);
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
            <p>${movie.overview}</p>
            <button onclick="toggleFavorite(${movieId})">Pašalinti iš mėgstamiausių</button>
        `;
        movieList.appendChild(movieItem);
    }
}


// Inicializacija su paieškos puslapiu
loadSearchPage();
