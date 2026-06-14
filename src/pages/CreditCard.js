import { useState } from "react";
import "./Pages.css";

function CreditCard() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
    return numbersOnly.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const saveCard = (e) => {
    e.preventDefault();

    const cardPattern = /^\d{4} \d{4} \d{4} \d{4}$/;

    if (!cardPattern.test(cardNumber)) {
      alert("Card number must follow this format: 1234 5678 9012 3456");
      return;
    }

    const savedCard = {
      cardName,
      cardNumber,
      expiration,
      cvv,
    };

    localStorage.setItem("streamlist-credit-card", JSON.stringify(savedCard));

    alert("Credit card saved successfully.");
  };

  return (
    <div className="page">
      <h1>Credit Card Management</h1>
      <p>Enter your payment information to complete checkout.</p>

      <form className="credit-card-form" onSubmit={saveCard}>
        <label>
          Name on Card
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </label>

        <label>
          Card Number
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </label>

        <label>
          Expiration Date
          <input
            type="text"
            placeholder="MM/YY"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            required
          />
        </label>

        <label>
          CVV
          <input
            type="password"
            maxLength="4"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </label>

        <button type="submit">Save Card</button>
      </form>
    </div>
  );
}

export default CreditCard;