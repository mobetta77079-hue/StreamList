import { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaPlus } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
    </Router>
  );
}

export default App;