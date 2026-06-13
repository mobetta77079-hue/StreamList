import { useEffect, useState } from "react";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedMovies, setSavedMovies] = useState(() => {
    try {
      const storedMovies = localStorage.getItem("savedMovies");
      return storedMovies ? JSON.parse(storedMovies) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  const searchMovies = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setErrorMessage("Please enter a movie title.");
      return;
    }

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    if (!apiKey) {
      setErrorMessage("TMDB API key is missing. Check your .env file.");
      return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      searchTerm
    )}`;

    try {
      setErrorMessage("");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch movies.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      setErrorMessage("Unable to load movies. Please check your API key.");
      console.error(error);
    }
  };

  const saveMovie = (movie) => {
    const alreadySaved = savedMovies.some((saved) => saved.id === movie.id);

    if (!alreadySaved) {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  const removeMovie = (movieId) => {
    setSavedMovies(savedMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <main className="container">
      <h1>Movie Search</h1>

      <form className="search-form" onSubmit={searchMovies}>
        <label htmlFor="movie-search">Search for a movie</label>

        <input
          id="movie-search"
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h2>Search Results</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <section key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>

            <p>
              <strong>Release Date:</strong> {movie.release_date || "N/A"}
            </p>

            <p>
              <strong>Rating:</strong> {movie.vote_average || "N/A"}
            </p>

            <p>{movie.overview || "No overview available."}</p>

            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
              />
            )}

            <button type="button" onClick={() => saveMovie(movie)}>
              Save Movie
            </button>
          </section>
        ))}
      </div>

      <h2>Saved Movies</h2>

      {savedMovies.length === 0 ? (
        <p>No saved movies yet.</p>
      ) : (
        <div className="movie-list">
          {savedMovies.map((movie) => (
            <section key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>

              <p>
                <strong>Release Date:</strong> {movie.release_date || "N/A"}
              </p>

              <p>
                <strong>Rating:</strong> {movie.vote_average || "N/A"}
              </p>

              <button type="button" onClick={() => removeMovie(movie.id)}>
                Remove Movie
              </button>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

export default MovieSearch;