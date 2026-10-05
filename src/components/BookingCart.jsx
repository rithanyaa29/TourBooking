import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
function BookingCart() {
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const {
    cartItems,
    bookingHistory,
    updateTravelers,
    removeFromCart,
    clearCart,
    cancelBooking,
    packageCost,
    discount,
    taxes,
    finalAmount
  } = useBooking();

  const visibleBookings = bookingHistory.filter(
    (booking) => booking.status !== "Cancelled"
  );

  return (
    <main className="booking-cart">
      <section className="booking-page-heading">
        <p className="page-eyebrow">YOUR TRAVEL SPACE</p>
        <h1>My Bookings</h1>
        <p>
          Welcome, {currentUser?.username}. Manage your selected packages and
          confirmed trips here.
        </p>
      </section>

      <section className="current-cart">
        <div className="booking-section-heading">
          <div>
            <p>READY TO BOOK</p>
            <h2>Selected Packages</h2>
          </div>
          <button
            className="small-outline-button"
            onClick={() => navigate("/packages")}
          >
            + Add Package
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🧳</div>
            <h3>Your booking cart is empty</h3>
            <p>
              Explore our destinations and select a package when you are ready
              to plan your trip.
            </p>
            <button
              className="button"
              onClick={() => navigate("/packages")}
            >
              Explore Packages
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="booking-package" key={item.id}>
                <div className="booking-package-main">
                  <span className="package-mini-category">
                    {item.category}
                  </span>
                  <h3>{item.title}</h3>
                  <p>
                    📍 {item.destination} • {item.location}
                  </p>
                  <p>₹{item.price.toLocaleString()} / person</p>
                </div>

                <div className="traveler-control">
                  <label>Travelers</label>
                  <input
                    type="number"
                    min="1"
                    value={item.travelers}
                    onChange={(e) =>
                      updateTravelers(item.id, e.target.value)
                    }
                  />
                </div>

                <div className="booking-item-total">
                  <span>Total</span>
                  <strong>
                    ₹{Number(item.total).toLocaleString()}
                  </strong>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >Remove
                </button>
              </div>
            ))}

            <div className="booking-summary">
              <div>
                <p>Package Cost <span>₹{packageCost.toLocaleString()}</span></p>
                <p>Discount <span>₹{discount.toLocaleString()}</span></p>
                <p>Taxes <span>₹{taxes.toLocaleString()}</span></p>
              </div>

              <hr />

              <h2>
                <span>Final Amount</span>
                <strong>₹{finalAmount.toLocaleString()}</strong>
              </h2>

              <div className="cart-buttons">
                <button className="button secondary-button" onClick={clearCart}>
                  Clear Cart
                </button>
                <button
                  className="button"
                  onClick={() => navigate("/booking/dates")}
                  >Continue Booking →
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="booking-history">
        <div className="booking-section-heading">
          <div>
            <p>YOUR TRIPS</p>
            <h2>Confirmed Bookings</h2>
          </div>
        </div>

        {visibleBookings.length === 0 ? (
          <div className="empty-cart history-empty">
            <div className="empty-icon">🌿</div>
            <h3>No confirmed bookings yet</h3>
            <p>
              Your completed bookings will appear here after payment.
            </p>
          </div>
        ) : (
          visibleBookings.map((booking, index) => (
            <div className="confirmed-booking" key={booking.id}>
              <div className="booking-history-top">
                <div>
                  <span className="confirmed-badge">Confirmed</span>
                  <h3>Booking {index + 1}</h3>
                </div>
                <strong>
                  ₹{Number(booking.finalAmount).toLocaleString()}
                </strong>
              </div>

              <h4>Packages</h4>

              {booking.packages.map((item) => (
                <div className="history-package" key={item.id}>
                  <p><strong>{item.title}</strong></p>
                  <p>
                    📍 {item.destination} • {item.location}
                  </p>
                  <p>Travelers: {item.travelers}</p>
                  <p>Amount: ₹{Number(item.total).toLocaleString()}</p>
                </div>
              ))}

              <div className="booking-history-details">
                <p>
                  <span>Travel Dates</span>
                  <strong>
                    {booking.travelDates.startDate} to {booking.travelDates.endDate}
                  </strong>
                </p>
                <p>
                  <span>Traveler</span>
                  <strong>{booking.travelerDetails.name}</strong>
                </p>
              </div>

              <button
                className="cancel-booking-button"
                onClick={() => cancelBooking(booking.id)}
              >Remove Booking
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default BookingCart;
