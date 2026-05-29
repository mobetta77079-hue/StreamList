import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>StreamList</h2>

      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/search">Search</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar;