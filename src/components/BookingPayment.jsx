import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function BookingPayment() {
  const navigate = useNavigate();

  const {
    confirmBooking,
    finalAmount
  } = useBooking();

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [error, setError] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setError("");

    const success = confirmBooking();

    if (success) {
      alert("Booking confirmed successfully!");

      navigate("/bookings");
    }
  };

  return (
    <div className="booking-step">

      <h2>4. Payment</h2>

      <p>
        Select a payment method to complete your booking.
      </p>

      <h3>
        Amount to Pay: ₹{finalAmount}
      </h3>

      <form onSubmit={handlePayment}>

        <div className="payment-method">

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            UPI
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            Credit / Debit Card
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Net Banking"
              checked={paymentMethod === "Net Banking"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            Net Banking
          </label>

        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="button"
        >
          Pay & Confirm Booking
        </button>

      </form>

    </div>
  );
}

export default BookingPayment;