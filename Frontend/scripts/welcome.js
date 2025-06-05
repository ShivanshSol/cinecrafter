// const apiKey = 'f315ad027f2783cd8687b93f29554a31';  // replace with your TMDB key
let genreMap = {};

async function fetchGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const data = await res.json();
    genreMap = {};
    data.genres.forEach(g => { genreMap[g.id] = g.name; });
}

async function loadMovies(url, containerId) {
    if (Object.keys(genreMap).length === 0) await fetchGenres();
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById(containerId);

    // // Fetch certificates for all movies in parallel
    // const certificates = await Promise.all(
    //     data.results.map(movie => getCertificate(movie.id))
    // );
    container.innerHTML = data.results.map(movie => {
        const ratingColor = movie.vote_average ? getRatingColor(movie.vote_average) : 'white';
        const ratingText = movie.vote_average ? `${movie.vote_average.toFixed(1)}★` : 'NR';
        const release = formatYearMonth(movie.release_date);
        const genre = movie.genre_ids && movie.genre_ids.length > 0 ? genreMap[movie.genre_ids[0]] : '';
        return `<div class='movie-card' onclick="openMovieDetails('${movie.id}')">
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${genre}</p>
                <div class="rating" style="background: ${ratingColor};">${ratingText}</div>
                
                <p>${release}</p>
            </div>
        </div>`;
    }).join('');
}

// async function getCertificate(movieId) {
//     const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`);
//     const data = await res.json();
//     // Find US certificate (or first available)
//     const us = data.results.find(r => r.iso_3166_1 === "US");
//     if (us && us.release_dates.length > 0) {
//         return us.release_dates[0].certification || '';
//     }
//     // fallback: first available
//     for (const r of data.results) {
//         if (r.release_dates.length > 0 && r.release_dates[0].certification) {
//             return r.release_dates[0].certification;
//         }
//     }
//     return '';
// }

function formatYearMonth(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getFullYear()}-${months[date.getMonth()]}`;
}

function getRatingColor(rating) {
    if (rating === 0) return 'white'; // For NR case, though handled separately

    // Hue: 0 (red) to 120 (green) scaled by rating 1-10
    const hue = (rating / 10) * 120;

    // Reduced saturation to 65%, lightness to 42% for a softer color on dark bg
    return `hsl(${hue}, 65%, 42%)`;
}

function openMovieDetails(movieId) {
    // Example redirect to movie details page, passing movieId as query parameter
    window.location.href = `../cinecrafter/details.html?id=${movieId}`;
}

function scrollLeft(id) { document.getElementById(id).scrollBy({ left: -300, behavior: 'smooth' }); }
function scrollRight(id) { document.getElementById(id).scrollBy({ left: 300, behavior: 'smooth' }); }
function startDrag(e, containerId) {
    const container = document.getElementById(containerId);
    let startX = e.pageX;
    let scrollLeft = container.scrollLeft;
    const onMouseMove = (ev) => { container.scrollLeft = scrollLeft - (ev.pageX - startX); };
    document.onmousemove = onMouseMove;
    document.onmouseup = () => { document.onmousemove = null; };
}
document.addEventListener("DOMContentLoaded", () => {
    loadMovies(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`, "trendingMovies");
    loadMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, "popularMovies");
    loadMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`, "topRatedMovies");
    loadMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`, "upcomingMovies");
    loadMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`, "nowPlayingMovies");
    loadMovies(`https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}`, "latestMovies");
});








function redirect() {
  window.location.href = '../cinecrafter/auth.html';
}

document.getElementById('stream-now-btn').addEventListener('click', function() {
  window.location.href = '../cinecrafter/auth.html';
});

document.getElementById('subscribe-btn').addEventListener('click', function() {
  
});


