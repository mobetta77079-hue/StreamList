function Subscriptions({ subscription = "Basic", setSubscription }) {
  const plans = ["Basic", "Standard", "Premium"];

  const handleSelectPlan = (plan) => {
    if (typeof setSubscription === "function") {
      setSubscription(plan);
    }
  };

  return (
    <main className="page">
      <h1>Subscription Plans</h1>

      <p>
        Current Plan: <strong>{subscription}</strong>
      </p>

      <div className="subscription-options">
        {plans.map((plan) => {
          const isCurrentPlan = subscription === plan;

          return (
            <section key={plan} className="subscription-card">
              <h2>{plan}</h2>

              <button
                type="button"
                onClick={() => handleSelectPlan(plan)}
                disabled={isCurrentPlan}
                aria-pressed={isCurrentPlan}
              >
                {isCurrentPlan ? "Current Plan" : "Select Plan"}
              </button>
            </section>
          );
        })}
      </div>
    </main>
  );
}

export default Subscriptions;