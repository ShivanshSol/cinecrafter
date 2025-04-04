
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