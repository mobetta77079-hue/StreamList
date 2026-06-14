import { Link } from "react-router-dom";
import "./Pages.css";

function Cart({ cart = [], updateQuantity, removeFromCart, clearCart }) {
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {item.image && (
                  <img src={item.image} alt={item.title || item.name} />
                )}

                <div>
                  <h2>{item.title || item.name}</h2>
                  <p>{item.description}</p>
                  <p>${Number(item.price).toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <h2>Total: ${total.toFixed(2)}</h2>

          <button onClick={clearCart}>Clear Cart</button>

          <br />
          <br />

          <Link to="/credit-card">
            <button>Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;