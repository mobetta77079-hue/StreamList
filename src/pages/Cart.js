import "./Pages.css";
import {Link} from "react-router-dom";

function Cart({cart, setCart}) {
    //Remove Item from cart
    const removeItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    //Add Quantity in cart
    const increaseQuantity = (id) => {
        setCart(cart.map((item) => item.id === id ? {...item, quantity: item.quantity + 1} : item));
    };

    //Decrease Quantity in cart
    const decreaseQuantity = (id) => {setCart(cart.map((item) => {
        if (item.id === id) {
            return item.quantity > 1 ? {...item, quantity: item.quantity - 1} : null;
        }
        return item;
    }).filter(Boolean));
    };

    //Calculate the Total Price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className = "page">
            <h2>Your Cart</h2>
            
            {cart.length === 0 ? (<p>Your cart is currently empty</p>) : ( <>
            <div className = "cart-list">
                {cart.map((item) => (
                    <div key = {item.id} className = "cart-item">
                        <img src = {item.image} alt = {item.title}/>

                        <div>
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            
                            <div className = "quantity-controls">
                                <button onClick = {() => decreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick = {() => increaseQuantity(item.id)}>+</button>
                            </div>

                            <button onClick = {() => removeItem(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <h3>Total: ${totalPrice.toFixed(2)}</h3>

            <Link to = "/checkout"><button>Proceed to Checkout</button></Link>
        </>)}
    </div>
    );
}

export default Cart;