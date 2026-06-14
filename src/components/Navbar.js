import { Link } from "react-router-dom";
import { FaFilm, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ cartCount = 0, user, logout }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/search">Search</Link>
        <Link to="/subscriptions">Subscriptions</Link>
      </div>

      <Link to="/" className="logo">
        <FaFilm />
        <span>StreamList</span>
      </Link>

      <div className="nav-links">
        <Link to="/cart" className="cart-link">
          <FaShoppingCart />
          <span>{cartCount}</span>
        </Link>

        <Link to="/credit-card" className="credit-link">
          <FaCreditCard />
        </Link>

        <Link to="/about">About</Link>

        {user ? (
          <button className="nav-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="nav-btn">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;