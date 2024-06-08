import {
    API_KEY,
    searchInput,
    searchResults,
    favoritesList,
} from "./constants.js";
import {
    addToFavorites,
    displayFavoriteMovie,
    removeFromFavorites,
} from "./favorites.js";

window.addToFavorites = addToFavorites;

window.removeFromFavorites = removeFromFavorites;

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    if (query.length > 2) {
        fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "True") {
                    displayResults(data.Search);
                } else {
                    searchResults.innerHTML = "<p>No results found</p>";
                }
            });
    } else {
        searchResults.innerHTML = "";
    }
});

function displayResults(movies) {
    searchResults.innerHTML = "";
    movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        const clickableElement = document.createElement("div");
        const unclickableElement = document.createElement("div");
        clickableElement.classList.add("clickable");
        unclickableElement.classList.add("unclickable");
        clickableElement.innerHTML = `
            <div class='clickable'>
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div>
                    <h2>${movie.Title}</h2>
                    <p>${movie.Year}</p>
                </div>
            </div>
        `;

        unclickableElement.innerHTML = `<div class='unclickable'>
                <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
            </div>`;

        clickableElement.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.imdbID}`;
        });

        movieElement.appendChild(clickableElement);
        movieElement.appendChild(unclickableElement);
        searchResults.appendChild(movieElement);
    });
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length > 0) {
    favorites.splice(0, 2).forEach((movieId) => {
        fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                displayFavoriteMovie(data);
            });
    });

    const favoriteLink = document.createElement("a");
    favoriteLink.setAttribute("href", "/favorites.html");
    favoriteLink.textContent = 'View all'

    document.querySelector(".favorites-container").append(favoriteLink);
} else {
    favoritesList.innerHTML = "<p>No favorite movies added yet.</p>";
}
