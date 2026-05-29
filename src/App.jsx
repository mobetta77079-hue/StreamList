import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieSearch from "./pages/MovieSearch";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1 className="page">Home Page</h1>} />
        <Route path="/movies" element={<h1 className="page">Movies Page</h1>} />
        <Route path="/cart" element={<h1 className="page">Cart Page</h1>} />
        <Route path="/about" element={<h1 className="page">About Page</h1>} />
        <Route path="/movie-search" element={<MovieSearch />} />
      </Routes>
    </Router>
  );
}

export default App;