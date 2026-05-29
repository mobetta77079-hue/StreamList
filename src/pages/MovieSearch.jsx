import { useEffect, useState } from "react";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState(() => {
    const storedMovies = localStorage.getItem("savedMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

    const response = await fetch(url);
    const data = await response.json();

    setMovies(data.results || []);
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
    <div className="container">
      <h1>Movie Search</h1>

      <form className="search-form" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <h2>Search Results</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>

            <p>
              <strong>Release Date:</strong> {movie.release_date || "N/A"}
            </p>

            <p>
              <strong>Rating:</strong> {movie.vote_average || "N/A"}
            </p>

            <p>{movie.overview}</p>

            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}

            <button onClick={() => saveMovie(movie)}>Save Movie</button>
          </div>
        ))}
      </div>

      <h2>Saved Movies</h2>

      {savedMovies.length === 0 ? (
        <p>No saved movies yet.</p>
      ) : (
        <div className="movie-list">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
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