import { useEffect, useState } from "react";
import "./Pages.css";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

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
    setError("");

    if (!searchTerm.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    try {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;

      if (!apiKey) {
        setError("TMDB API key is missing. Check your .env file.");
        return;
      }

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        searchTerm
      )}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch movies.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Movie search failed:", error);
      setError("Movie search failed. Please try again.");
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
    <div className="page">
      <h1>Movie Search</h1>

      <form className="movie-form" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {error && <p className="warning">{error}</p>}

      <h2>Search Results</h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            <p>
              <strong>Release Date:</strong> {movie.release_date || "N/A"}
            </p>

            <p>
              <strong>Rating:</strong> {movie.vote_average || "N/A"}
            </p>

            <p>{movie.overview || "No overview available."}</p>

            <button onClick={() => saveMovie(movie)}>Save Movie</button>
          </div>
        ))}
      </div>

      <h2>Saved Movies</h2>

      {savedMovies.length === 0 ? (
        <p>No saved movies yet.</p>
      ) : (
        <div className="movie-grid">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
              />

              <h3>{movie.title}</h3>

              <p>
                <strong>Release Date:</strong> {movie.release_date || "N/A"}
              </p>

              <p>
                <strong>Rating:</strong> {movie.vote_average || "N/A"}
              </p>

              <button onClick={() => removeMovie(movie.id)}>
                Remove Movie
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;