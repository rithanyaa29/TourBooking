import { Outlet } from "react-router-dom";

function BookingLayout() {

  return (
    <main className="booking-layout">

      <h1>Complete Your Booking</h1>

      <p>
        Follow the steps below to complete your travel booking.
      </p>

      <Outlet />

    </main>
  );
}

export default BookingLayout;