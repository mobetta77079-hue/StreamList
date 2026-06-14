import { useEffect, useState } from "react";
import "./Pages.css";

function CreditCard() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [savedCard, setSavedCard] = useState(null);

  useEffect(() => {
    const storedCard = localStorage.getItem("streamlist-credit-card");

    if (storedCard) {
      setSavedCard(JSON.parse(storedCard));
    }
  }, []);

  const formatCardNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
    return numbersOnly.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const maskCardNumber = (number) => {
    return "**** **** **** " + number.slice(-4);
  };

  const saveCard = (e) => {
    e.preventDefault();

    const cardPattern = /^\d{4} \d{4} \d{4} \d{4}$/;

    if (!cardPattern.test(cardNumber)) {
      alert("Card number must follow this format: 1234 5678 9012 3456");
      return;
    }

    const newCard = {
      cardName,
      cardNumber,
      expiration,
      cvv,
    };

    localStorage.setItem(
      "streamlist-credit-card",
      JSON.stringify(newCard)
    );

    setSavedCard(newCard);

    setCardName("");
    setCardNumber("");
    setExpiration("");
    setCvv("");

    alert("Credit card saved successfully.");
  };

  const deleteCard = () => {
    localStorage.removeItem("streamlist-credit-card");
    setSavedCard(null);
  };

  return (
    <div className="page">
      <h1>Credit Card Management</h1>

      <p>
        Enter your payment information and save it to your
        account.
      </p>

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

        <button type="submit">
          Save Credit Card
        </button>
      </form>

      {savedCard && (
        <div className="saved-card">
          <h2>Saved Credit Card</h2>

          <p>
            <strong>Name:</strong>{" "}
            {savedCard.cardName}
          </p>

          <p>
            <strong>Card Number:</strong>{" "}
            {maskCardNumber(savedCard.cardNumber)}
          </p>

          <p>
            <strong>Expiration:</strong>{" "}
            {savedCard.expiration}
          </p>

          <p>
            <strong>CVV:</strong> ***
          </p>

          <button onClick={deleteCard}>
            Delete Saved Card
          </button>
        </div>
      )}
    </div>
  );
}

export default CreditCard;