import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import Subscriptions from "./pages/Subscriptions";
import MovieSearch from "./pages/MovieSearch";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("streamlist-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("streamlist-cart", JSON.stringify(cart));
  }, [cart]);

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

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setUser(false);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount} user={user} logout={logout} />

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/" element={<Movies addToCart={addToCart} />} />

        <Route path="/movies" element={<Movies addToCart={addToCart} />} />

        <Route path="/search" element={<MovieSearch addToCart={addToCart} />} />

        <Route
          path="/subscriptions"
          element={<Subscriptions addToCart={addToCart} />}
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
    </Router>
  );
}

export default App;