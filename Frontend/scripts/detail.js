document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('movieId');
    const apiKey = 'f315ad027f2783cd8687b93f29554a31'; // Replace with your TMDB API Key

    if (!movieId) {
        document.body.innerHTML = "<h2>Movie not found!</h2>";
        return;
    }

    try {
        // Fetching movie details from TMDB API
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
        const movie = await response.json();

        // Displaying movie details
        document.getElementById("trailer-video").href = `https://www.youtube.com/watch?v=${movie.videos.results[0].key}`;
        document.getElementById("movie-title").innerText = movie.title;
        document.getElementById("movie-poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById("movie-overview").innerText = movie.overview;
        document.getElementById("release-date").innerText = movie.release_date;
        document.getElementById("movie-rating").innerText = `${movie.vote_average} / 10`;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        document.body.innerHTML = "<h2>Unable to load movie details!</h2>";
    }
});
