import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>EZTechMovie</h2>

      <div className="nav-links">
        <Link to="/">StreamList</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/about">About</Link>
        <Link to="/movie-search">Movie Search</Link>
      </div>
    </nav>
  );
}

export default Navbar;