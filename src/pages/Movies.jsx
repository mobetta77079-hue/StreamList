const movieProducts = [
  {
    id: 1,
    title: "Black Panther",
    price: 12.99,
    category: "Movie Rental",
  },
  {
    id: 2,
    title: "The Batman",
    price: 10.99,
    category: "Movie Rental",
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    price: 11.99,
    category: "Movie Rental",
  },
  {
    id: 4,
    title: "EZTech Streaming Remote",
    price: 24.99,
    category: "Accessory",
  },
  {
    id: 5,
    title: "HDMI Cable",
    price: 9.99,
    category: "Accessory",
  },
];

function Movies({ addToCart }) {
  return (
    <main className="page">
      <h1>Movies & EZTech Products</h1>

      <p>
        Browse movies and streaming accessories. Add items to your cart to
        review your total before checkout.
      </p>

      <div className="product-list">
        {movieProducts.map((item) => (
          <section key={item.id} className="product-card">
            <h2>{item.title}</h2>
            <p>{item.category}</p>
            <p>
              <strong>${item.price.toFixed(2)}</strong>
            </p>

            <button type="button" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Movies;