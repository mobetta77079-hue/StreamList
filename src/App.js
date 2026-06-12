import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react";

import Navbar from "./components/Navbar";

import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";

import './App.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [warning, setWarning] = useState("");

  const [user, setUser] = useState(localStorage.getItem("loggedIn") === "true");

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Navbar cart = {cart}/>
        {warning && (
          <div className = "warning">{warning}</div>
        )}
        <Routes>
          <Route path = "/login" element = {<Login setUser = {setUser} />} />

          <Route path = "/" element = {<ProtectedRoute user = {user}><StreamList /></ProtectedRoute>} />

          <Route path = "/movies" element = {<ProtectedRoute user = {user}><Movies cart = {cart} setCart = {setCart}/></ProtectedRoute>}/>

          <Route path = "/subscriptions" element = {<ProtectedRoute user = {user}><Subscriptions cart = {cart} setCart = {setCart} setWarning = {setWarning}/></ProtectedRoute>} />
          
          <Route path = "/cart" element = {<ProtectedRoute user = {user}><Cart cart = {cart} setCart = {setCart}/></ProtectedRoute>} />

          <Route path = "/checkout" element = {<ProtectedRoute user = {user}><Checkout /></ProtectedRoute>} />
            
          <Route path = "/about" element = {<ProtectedRoute user = {user}><About /></ProtectedRoute>} />

        </Routes>
    </Router>
  );
}

export default App;
