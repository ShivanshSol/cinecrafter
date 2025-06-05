// This script fetches popular movies from TMDB API and displays them on the page.
const apiKey = 'f315ad027f2783cd8687b93f29554a31'; // Replace with your TMDB API Key
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    loadMovies(currentPage);
});

async function loadMovies(page) {
    const moviesContainer = document.getElementById("movies-container");
    const paginationContainer = document.getElementById("pagination");
    moviesContainer.innerHTML = "Loading...";
    paginationContainer.innerHTML = "";

    try {
        // Fetching movies for the current page
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
        const data = await response.json();
        const movies = data.results;
        currentPage = page;

        // Displaying the movies
        moviesContainer.innerHTML = "";
        movies.forEach(movie => {
            const movieDiv = document.createElement("div");

            movieDiv.addEventListener("click", () => {
                window.location.href = `details.html?movieid=${movie.id}`;
            });
            movieDiv.style.cursor = "pointer";
            movieDiv.style.backgroundColor = "black";
            movieDiv.style.borderRadius = "6px";
            movieDiv.style.marginBottom = "20px";
            movieDiv.style.width = "210px";
            movieDiv.style.height = "360px";

            movieDiv.style.textAlign = "center";
            movieDiv.style.color = "white";

                        // Adding hover effect
            movieDiv.style.transition = "transform 0.2s";
            movieDiv.addEventListener("mouseover", () => {
                movieDiv.style.transform = "scale(1.05)";
            });
            movieDiv.addEventListener("mouseout", () => {
                movieDiv.style.transform = "scale(1)";
            });

            movieDiv.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}"
                    alt="${movie.title}" title="${movie.title}"
                    width="100%" height="280"
                    style="object-fit: cover; border-radius: 6px 6px 0 0;">
                <h3>${movie.title}</h3>
            `;
            moviesContainer.appendChild(movieDiv);
        });
        
        // Styling the movies container
        moviesContainer.style.paddingTop = "120px";
        moviesContainer.style.paddingBottom = "180px";

        moviesContainer.style.paddingLeft = "180px";
        moviesContainer.style.paddingRight = "180px";
        moviesContainer.style.display = "flex";
        moviesContainer.style.flexWrap = "wrap";
        moviesContainer.style.justifyContent = "space-between";
        moviesContainer.style.gap = "20px";

        // Displaying pagination
        setupPagination(data.page, data.total_pages);
    } catch (error) {
        console.error("Error fetching movies:", error);
        moviesContainer.innerHTML = "Error loading movies.";
    }
}

// Function to setup pagination
function setupPagination(current, total) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    // Previous Button
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.disabled = current === 1;
    prevButton.onclick = () => loadMovies(current - 1);
    paginationContainer.appendChild(prevButton);

    // Helper to add a page button
    function addPageBtn(i) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.toggle("active", i === current);
        pageButton.onclick = () => loadMovies(i);
        paginationContainer.appendChild(pageButton);
    }

    // Always show first page
    addPageBtn(1);

    // Show ... if needed before window
    if (current > 4) {
        const dot = document.createElement("span");
        dot.innerText = "...";
        paginationContainer.appendChild(dot);
    }

    // Show window of pages around current
    for (let i = Math.max(2, current - 2); i <= Math.min(total - 1, current + 2); i++) {
        addPageBtn(i);
    }

    // Show ... if needed after window
    if (current < total - 3) {
        const dot = document.createElement("span");
        dot.innerText = "...";
        paginationContainer.appendChild(dot);
    }

    // Always show last page if more than 1
    if (total > 1) {
        addPageBtn(total);
    }

    // Next Button
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.disabled = current === total;
    nextButton.onclick = () => loadMovies(current + 1);
    paginationContainer.appendChild(nextButton);
}

// // Function to open movie details page with ID in the URL
// function openMovieDetails(movieId) {
//     window.location.href = `movie-details.html?movieId=${movieId}`;
// }
