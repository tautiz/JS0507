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

function loadFavoritesPage() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Favorites</h1><p>Coming soon...</p>';
}

/**
 * Shows the details of a movie.
 * @param {number} movieId - The ID of the movie to display.
 */
async function showMovieDetails(movieId) {
    // Fetch movie details from TMDb API
    const movie = await fetchFromTMDb(`/movie/${movieId}`);
    
    // Get the content element to display the movie details
    const content = document.getElementById('content');
    
    // Create the movie details HTML
    content.innerHTML = `
        <h1>${movie.title}</h1>
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
        <p>${movie.overview}</p>
        <button id="favoriteButton">
            ${isFavorite(movieId) ? "Remove from Favorites" : "Add to Favorites"}
        </button>
    `;
    
    // Add event listener to the favorite button
    document.getElementById('favoriteButton').addEventListener('click', () => toggleFavorite(movieId));
}

/**
 * Checks if a movie is in the favorites list.
 * @param {number} movieId - The ID of the movie to check.
 * @returns {boolean} - True if the movie is a favorite, false otherwise.
 */
function isFavorite(movieId) {
    // Retrieve favorites from localStorage or set to an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(movieId);
}

/**
 * Toggles the favorite status of a movie.
 * @param {number} movieId - The ID of the movie to toggle.
 */
function toggleFavorite(movieId) {
    // Retrieve favorites from localStorage or set to an empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Add or remove the movie from favorites
    if (favorites.includes(movieId)) {
        favorites = favorites.filter(id => id !== movieId);
    } else {
        favorites.push(movieId);
    }
    
    // Save the updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Refresh the movie details page
    showMovieDetails(movieId);
}


// Inicializacija su paieškos puslapiu
loadSearchPage();
