import { Link } from "react-router-dom";

<<<<<<< HEAD
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
=======
function Navbar() {
  return (
    <nav className="navbar">
      <h2>StreamList</h2>

      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/search">Search</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/about">About</Link>
>>>>>>> ef67eb777223ecac55c780229bc8c16bf9238b7e
    </nav>
  );
}

export default Navbar;