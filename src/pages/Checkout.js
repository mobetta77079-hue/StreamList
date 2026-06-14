import { useState } from "react";
import "./Pages.css";

function Checkout() {
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem(
            "creditCard",
            JSON.stringify({
                cardName,
                cardNumber,
                expiration,
                cvv,
            })
        );

        alert("Card saved successfully!");
    };

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\D/g, "");

        return cleaned
            .replace(/(\d{4})(?=\d)/g, "$1 ")
            .substring(0, 19);
    };

    return (
        <div className="page">
            <h2>Checkout</h2>

            <form className="credit-card-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength="19"
                    required
                />

                <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                    maxLength="5"
                    required
                />

                <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength="4"
                    required
                />

                <button type="submit">Save Card</button>
            </form>
        </div>
    );
}

export default Checkout;