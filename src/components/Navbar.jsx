import { Link } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <Link to="/" className="logo">
        <h2>StreamList</h2>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/search">Search</Link>
        <Link to="/subscriptions">Subscriptions</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </nav>
  );
}

export default Navbar;
