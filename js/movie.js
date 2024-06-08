import { API_KEY, movieDetails, movieId } from "./constants.js   ";
import { addToFavorites } from "./favorites.js";
(() => {
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            displayMovieDetails(data);
        });

    function displayMovieDetails(movie) {
        movieDetails.innerHTML = `
            <h1>${movie.Title}</h1>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p>${movie.Plot}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Released:</strong> ${movie.Released}</p>
            <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        `;

        const btn = document.createElement("button");
        btn.textContent = "Add to Favorites";
        movieDetails.appendChild(btn);
        btn.addEventListener("click", () => addToFavorites(movie.imdbID));
    }
})();
