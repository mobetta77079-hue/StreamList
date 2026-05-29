import { useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("StreamList item:", title);
    setTitle("");
  };

  return (
    <div className="page">
      <h1>StreamList</h1>
      <p>Create your personal list of movies and shows to watch.</p>

      <form onSubmit={handleSubmit} className="stream-form">
        <input
          type="text"
          placeholder="Enter a movie or show"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add to StreamList</button>
      </form>
    </div>
  );
}

export default StreamList;