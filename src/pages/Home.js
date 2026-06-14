import { GoogleLogin } from "@react-oauth/google";
import "./Pages.css";

function Home({ user, setUser }) {
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

  const handleSuccess = () => {
    localStorage.setItem("loggedIn", "true");
    setUser(true);
  };

  return (
    <div className="page">
      <h1>Welcome to StreamList</h1>
      <p>Search, save, and manage your favorite movies.</p>

      {!user ? (
        <>
          <h2>Login with Google</h2>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </>
      ) : (
        <>
          <h2>Your Saved Movies</h2>

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
                  <p>Rating: {movie.vote_average || "N/A"}</p>
                </div>
              ))}
            </div>
          )}

          
        </>
      )}
    </div>
  );
}

export default Home;