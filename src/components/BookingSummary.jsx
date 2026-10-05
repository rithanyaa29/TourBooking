import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import TravelerCard from "./TravelerCard.jsx"
function BookingSummary() {
  const navigate = useNavigate();

  const {
    cartItems,
    travelDates,
    travelerDetails,
    travelerCount,
    packageCost,
    discount,
    taxes,
    finalAmount
  } = useBooking();

  const handleContinue = () => {
    navigate("/booking/payment");
  };

  return (
    <div className="booking-step">

      <h2>3. Booking Summary</h2>

      {/* Selected Packages */}
      <section>
        <h3>Selected Packages</h3>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="summary-item"
          >
            <h4>{item.title}</h4>

            <p>
              Destination: {item.destination}
            </p>

            <p>
              Duration: {item.duration} days
            </p>

            <p>
              Travelers: {item.travelers}
            </p>

            <p>
              Amount: ₹{item.total}
            </p>
          </div>
        ))}
      </section>


      {/* Travel Information */}
      <section>
        <h3>Travel Information</h3>

        <p>
          Start Date: {travelDates.startDate}
        </p>

        <p>
          End Date: {travelDates.endDate}
        </p>

        <p>
          Total Travelers: {travelerCount}
        </p>
      </section>


      {/* Traveler Information */}
      <section>
  <h3>Traveler Information</h3>

  <TravelerCard traveler={travelerDetails} />
</section>


      {/* Payment Summary */}
      <section>
        <h3>Payment Summary</h3>

        <p>
          Package Cost: ₹{packageCost}
        </p>

        <p>
          Discount: ₹{discount}
        </p>

        <p>
          Taxes: ₹{taxes}
        </p>

        <hr />

        <h2>
          Final Amount: ₹{finalAmount}
        </h2>
      </section>


      <button
        className="button"
        onClick={handleContinue}
      >
        Continue to Payment
      </button>

    </div>
  );
}

export default BookingSummary;