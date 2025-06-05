// const apiKey = 'f315ad027f2783cd8687b93f29554a31';
const movieDiv = document.getElementById('movies');
const paginationDiv = document.getElementById('pagination');
let currentPage = 1;
let totalPages = 1; // will update from API later
let genreMap = {};

// Fetch genres once and map them by id
async function fetchGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const data = await res.json();
    genreMap = {};
    data.genres.forEach(g => { genreMap[g.id] = g.name; });
}

// Format release date as "YYYY-MMM"
function formatYearMonth(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getFullYear()}-${months[date.getMonth()]}`;
}

// Return a color based on rating (0-10 scale)
function getRatingColor(rating) {
    if (!rating || rating === 0) return 'white'; // NR case
    const hue = (rating / 10) * 120; // green to red scale
    return `hsl(${hue}, 65%, 42%)`;
}

// Redirect to movie details page
function openMovieDetails(movieId) {
    window.location.href = `../cinecrafter/details.html?id=${movieId}`;
}

// Load movies dynamically, update movieDiv and pagination
async function loadMovies(page = 1) {
    window.scrollTo(0, 0); // Scroll to top on every page change
    currentPage = page;

    if (Object.keys(genreMap).length === 0) {
        await fetchGenres();
    }

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    try {
        const res = await fetch(url);
        const data = await res.json();

        totalPages = data.total_pages;

        movieDiv.innerHTML = data.results.map(movie => {
            const ratingColor = getRatingColor(movie.vote_average);
            const ratingText = movie.vote_average ? `${movie.vote_average.toFixed(1)} ★` : 'NR';
            const release = formatYearMonth(movie.release_date);
            const genre = (movie.genre_ids && movie.genre_ids.length > 0) ? genreMap[movie.genre_ids[0]] : '';

            return `
            <div class="movie-card" onclick="openMovieDetails('${movie.id}')">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" loading="lazy" />
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p class="genre">${genre}</p>
                    <div class="rating" style="background-color: ${ratingColor};">${ratingText}</div>
                    <p class="release-date">${release}</p>
                </div>
            </div>`;
        }).join('');

        setupPagination(currentPage, totalPages);

    } catch (error) {
        console.error('Error loading movies:', error);
        movieDiv.innerHTML = '<p>Failed to load movies. Please try again later.</p>';
        paginationDiv.innerHTML = '';
    }
}

// Create pagination buttons dynamically
function setupPagination(current, total) {
    let html = '';

    html += `<button onclick="loadMovies(1)" ${current === 1 ? 'disabled' : ''}>First</button>`;
    html += `<button onclick="loadMovies(${current - 1})" ${current === 1 ? 'disabled' : ''}>Previous</button>`;

    // Show ... if pages before current-2
    if (current > 3) html += `<span>...</span>`;

    // Show 5 page numbers centered on current
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) {
        html += `<button class="${i === current ? 'active' : ''}" onclick="loadMovies(${i})">${i}</button>`;
    }

    // Show ... if pages after current+2
    if (current < total - 2) html += `<span>...</span>`;

    html += `<button onclick="loadMovies(${current + 1})" ${current === total ? 'disabled' : ''}>Next</button>`;
    html += `<button onclick="loadMovies(${total})" ${current === total ? 'disabled' : ''}>Last</button>`;

    paginationDiv.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMovies(currentPage);
});
