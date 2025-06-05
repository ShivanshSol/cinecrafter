const apiKey = 'f315ad027f2783cd8687b93f29554a31';

const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");

// to focus the search-bar  from search-btn
searchButton.addEventListener("click", function() {
    searchInput.focus();
});

// to switch btw search-btn & search-clear
searchInput.addEventListener("input", function() {
    if (searchInput.value.length > 0) {
        clearButton.style.display = "block";
        searchButton.style.display = "none";

    } else {
        clearButton.style.display = "none";
        searchButton.style.display = "block";
    }
});

// to clear the search with search-clear
clearButton.addEventListener("click", function() {
    searchInput.value = "";
    clearButton.style.display = "none";
    searchButton.style.display = "block";
    searchInput.focus();
});


// to go to top
const pageTop = document.getElementsByClassName("page-top-btn")[0];
pageTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// to toggle the side menu
const container = document.getElementById('side-menu-container');
const sideMenu = document.getElementById('side-menu');

function toggleSideMenu(){
    if(container.style.display === 'block' || sideMenu.style.display === 'block') {
        sideMenu.style.display = 'none';
        container.style.display = 'none';

    }
    else{
        sideMenu.style.display = 'block';
        container.style.display = 'block';
    }
}

function toggleSearchResults() {
    const resultsContainer = document.getElementById("search-results");
    if (resultsContainer.style.display === "block") {
        resultsContainer.style.display = "none";
    } else {
        resultsContainer.style.display = "block";
    }
}


// searchbar

async function searchMovies(id1, id2) {
    const query = document.getElementById("search-bar").value.trim();
    const resultsContainer = document.getElementById("search-results");
    const container = document.getElementById("side-menu-container");
    // const searchButton = document.getElementById("search-btn");
    const clearButton = document.getElementById("id2");


    container.style.display = "block"; // Show results container

    if (query.length < 2) {
        resultsContainer.innerHTML = ""; // Clear results if query is too short
        return;
    }

    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        console.log("Search Results:", data);

        if (data.results && data.results.length > 0) {
            resultsContainer.innerHTML = data.results.map(movie => `
                <div class='movie-card' onclick="openMovieDetails('${movie.id}')">
                    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                    </div>
                </div>
            `).join('');
        } else {
            resultsContainer.innerHTML = "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error searching movies:", error);
        resultsContainer.innerHTML = "<p class='error'>Failed to search movies. Please try again later.</p>";
    }
}
