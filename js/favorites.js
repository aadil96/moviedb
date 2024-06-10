import { API_KEY, favoritesList } from "./constants.js";

const isFavoritePage = () =>
    window.location.pathname.includes("/favorites.html");

export function displayFavoriteMovie(movie) {
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

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", () => removeFromFavorites(movie.imdbID));

    clickableElement.addEventListener("click", () => {
        window.location.href = `movie.html?id=${movie.imdbID}`;
    });
    movieElement.appendChild(clickableElement);
    movieElement.appendChild(btn);
    favoritesList.appendChild(movieElement);
}

export function addToFavorites(movieId) {
    if (!movieId) {
        return;
    }

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        window.location.reload();
    } else {
        alert("Movie already added to favorites");
    }
}

export function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((id) => id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.location.reload();
}

if (isFavoritePage()) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length > 0) {
        favorites.forEach((movieId) => {
            fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    displayFavoriteMovie(data);
                });
        });
    } else {
        favoritesList.innerHTML = "<p>No favorite movies added yet.</p>";
    }
}
