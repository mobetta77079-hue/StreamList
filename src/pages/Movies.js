import "./Pages.css";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/tmdb";

function Movies({ addToCart }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data || []);
    };

    fetchMovies();
  }, []);

  const handleAddToCart = (movie) => {
    addToCart({
      id: movie.id,
      title: movie.title,
      name: movie.title,
      description: `Rating: ${movie.vote_average || "N/A"}`,
      price: 9.99,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image",
    });
  };

  return (
    <div className="page">
      <h2>Popular Movies</h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            <p>Rating: {movie.vote_average || "N/A"}</p>

            <button onClick={() => handleAddToCart(movie)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;