import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import Subscriptions from "./pages/Subscriptions";
import MovieSearch from "./pages/MovieSearch";
import Login from "./pages/Login";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import CreditCard from "./pages/CreditCard";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("streamlist-cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("streamlist-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 1) + 1,
              }
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
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) + amount, 1),
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("streamlist-user");
    setUser(false);
  };

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <Router>
      {user && (
        <Navbar
          cartCount={cartCount}
          user={user}
          logout={logout}
        />
      )}

      <Routes>

        {/* Login Route */}
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        {/* Protected Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        {/* Protected Movies */}
        <Route
          path="/movies"
          element={
            <ProtectedRoute user={user}>
              <Movies addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        {/* Protected Movie Search */}
        <Route
          path="/search"
          element={
            <ProtectedRoute user={user}>
              <MovieSearch addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        {/* Protected Subscriptions */}
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute user={user}>
              <Subscriptions addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        {/* Protected Cart */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            </ProtectedRoute>
          }
        />

        {/* Protected Checkout */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={user}>
              <Checkout cart={cart} />
            </ProtectedRoute>
          }
        />

        {/* Protected Credit Card Page */}
        <Route
          path="/credit-card"
          element={
            <ProtectedRoute user={user}>
              <CreditCard />
            </ProtectedRoute>
          }
        />

        {/* Protected About */}
        <Route
          path="/about"
          element={
            <ProtectedRoute user={user}>
              <About />
            </ProtectedRoute>
          }
        />

        {/* Redirect Unknown Routes */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;