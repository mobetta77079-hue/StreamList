<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import Subscriptions from "./pages/Subscriptions";
import MovieSearch from "./pages/MovieSearch";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("streamlist-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [subscription, setSubscription] = useState(() => {
    return localStorage.getItem("streamlist-subscription") || "Basic";
  });

  useEffect(() => {
    localStorage.setItem("streamlist-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("streamlist-subscription", subscription);
  }, [subscription]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Movies addToCart={addToCart} subscription={subscription} />}
        />

        <Route
          path="/movies"
          element={<Movies addToCart={addToCart} subscription={subscription} />}
        />

        <Route path="/search" element={<MovieSearch />} />

        <Route
          path="/subscriptions"
          element={
            <Subscriptions
              subscription={subscription}
              setSubscription={setSubscription}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
=======
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieSearch from "./pages/MovieSearch";
=======
import { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaPlus } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
>>>>>>> dbf9009ac6de37214e9d1350b7905fbfe0072740
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex].text = input;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, { text: input, completed: false }]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setInput(items[index].text);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h2>StreamList</h2>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </nav>

<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<h1 className="page">Home Page</h1>} />
        <Route path="/movies" element={<h1 className="page">Movies Page</h1>} />
        <Route path="/cart" element={<h1 className="page">Cart Page</h1>} />
        <Route path="/about" element={<h1 className="page">About Page</h1>} />
        <Route path="/movie-search" element={<MovieSearch />} />
      </Routes>
=======
        <Routes>
          <Route
            path="/"
            element={
              <main className="container">
                <h1>My StreamList</h1>
                <p>Add movies or shows you want to watch.</p>

                <form onSubmit={handleSubmit} className="form">
                  <input
                    type="text"
                    placeholder="Enter a movie or show"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  <button type="submit">
                    <FaPlus /> {editIndex !== null ? "Update" : "Add"}
                  </button>
                </form>

                <ul className="list">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className={item.completed ? "completed" : ""}
                    >
                      <span>{item.text}</span>

                      <div className="buttons">
                        <button onClick={() => handleComplete(index)}>
                          <FaCheck />
                        </button>

                        <button onClick={() => handleEdit(index)}>
                          <FaEdit />
                        </button>

                        <button onClick={() => handleDelete(index)}>
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </main>
            }
          />

          <Route path="/movies" element={<h1 className="container">Movies Page</h1>} />
          <Route path="/cart" element={<h1 className="container">Cart Page</h1>} />
          <Route path="/about" element={<h1 className="container">About Page</h1>} />
        </Routes>
      </div>
>>>>>>> dbf9009ac6de37214e9d1350b7905fbfe0072740
>>>>>>> ef67eb777223ecac55c780229bc8c16bf9238b7e
    </Router>
  );
}

export default App;