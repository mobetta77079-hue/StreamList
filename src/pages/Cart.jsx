function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="page">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Your Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <section key={item.id} className="cart-card">
            <div>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>

            <div className="quantity-controls">
              <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                +
              </button>
            </div>

            <p>
              <strong>
                Item Total: ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </p>

            <button
              type="button"
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </section>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
        <p>
          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
        </p>

        <button type="button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </main>
  );
}

export default Cart;