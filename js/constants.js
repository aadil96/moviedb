export const API_KEY = "99d2d9a0";

export const searchInput = document.getElementById("search-input");
export const searchResults = document.getElementById("search-results");

export const movieDetails = document.getElementById("movie-details");
export const urlParams = new URLSearchParams(window.location.search);
export const movieId = urlParams.get("id");

export const favoritesList = document.getElementById("favorites-list");