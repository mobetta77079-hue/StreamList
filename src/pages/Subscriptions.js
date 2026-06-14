import {
  FaUser,
  FaUsers,
  FaGlobe,
  FaShareAlt,
  FaTshirt,
  FaMobileAlt,
} from "react-icons/fa";
import "./Pages.css";

function Subscriptions({ addToCart }) {
  const items = [
    {
      id: 101,
      name: "Basic Subscription",
      description: "For one User",
      price: 4.99,
      icon: <FaUser size={70} />,
    },
    {
      id: 102,
      name: "Gold Subscription",
      description: "Share with Family",
      price: 9.99,
      icon: <FaUsers size={70} />,
    },
    {
      id: 103,
      name: "Premium Subscription",
      description: "Share with the World",
      price: 12.99,
      icon: <FaGlobe size={70} />,
    },
    {
      id: 104,
      name: "Social Media Sharing Subscription",
      description: "Share your list",
      price: 2.99,
      icon: <FaShareAlt size={70} />,
    },
    {
      id: 201,
      name: "EZ Techmerizing",
      description: "Techmerize your friends",
      price: 25.99,
      icon: <FaTshirt size={70} />,
    },
    {
      id: 202,
      name: "EZ Tech Case",
      description: "Mesmerize your friends",
      price: 20.99,
      icon: <FaMobileAlt size={70} />,
    },
  ];

  return (
    <div className="page">
      <h1>Subscriptions & Merchandise</h1>

      <div className="subscription-grid">
        {items.map((item) => (
          <div key={item.id} className="subscription-card">
            <div className="subscription-icon">{item.icon}</div>

            <h2>{item.name}</h2>

            <p>{item.description}</p>

            <h3>${item.price.toFixed(2)}</h3>

            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;