function Home({ cartCount, subscription }) {
  return (
    <div className="page home-dashboard">
      <h1>Welcome Back to StreamList</h1>

      <div className="dashboard-cards">
        <div className="dash-card">
          <h2>Your Plan</h2>
          <p>{subscription}</p>
        </div>

        <div className="dash-card">
          <h2>Items in Cart</h2>
          <p>{cartCount}</p>
        </div>

        <div className="dash-card">
          <h2>Explore</h2>
          <a href="/movies">Browse Movies</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
