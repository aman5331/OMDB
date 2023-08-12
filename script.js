const apiKeyInput = document.getElementById("api-key");
const movieTitleInput = document.getElementById("movie-title");
const searchBtn = document.getElementById("search-btn");
const loader = document.getElementById("loader");
const resultsContainer = document.getElementById("results");

searchBtn.addEventListener("click", searchMovies);

async function searchMovies() {
  const apiKey = apiKeyInput.value;
  const movieTitle = movieTitleInput.value;

  if (!apiKey || !movieTitle) {
    alert("Please provide both API Key and Movie Title.");
    return;
  }

  loader.style.display = "block";
  resultsContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/apikey.aspx?s=${encodeURIComponent(
        movieTitle
      )}&apikey=${apiKey}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      const movies = data.Search;
      movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title} (${movie.Year})</h3>
                    <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
                `;
        resultsContainer.appendChild(movieCard);
      });
    } else {
      alert(data.Error);
    }
  } catch (error) {
    alert("An error occurred while fetching data.");
  } finally {
    loader.style.display = "none";
  }
}
