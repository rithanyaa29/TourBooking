import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../context/BookingContext";
import { fetchAvailability } from "../api/api";

import Button from "./Button";
import DatePicker from "./DatePicker";
import Loading from "./Loading";

function BookingDates() {
  const navigate = useNavigate();

  const {
    travelDates,
    updateTravelDates,
    cartItems
  } = useBooking();

  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedPackage = cartItems[0];

  useEffect(() => {
    const loadAvailability = async () => {
      if (!selectedPackage) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await fetchAvailability(
          selectedPackage.id
        );

        setAvailability(data);
      } catch (err) {
        console.error(
          "Error fetching availability:",
          err
        );

        setError(
          "Unable to retrieve package availability."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, [selectedPackage]);

  const handleContinue = () => {
    if (!selectedPackage) {
      alert("Please select a package first.");
      navigate("/packages");
      return;
    }

    if (!travelDates.startDate) {
      alert("Please select a travel date.");
      return;
    }

    if (
      availability &&
      !availability.available
    ) {
      alert("This package is currently unavailable.");
      return;
    }

    navigate("/booking/travelers");
  };

  if (!selectedPackage) {
    return (
      <div className="booking-step">
        <h2>1. Select Travel Date</h2>

        <p>
          Please select a travel package before
          choosing your travel date.
        </p>

        <Button
          onClick={() => navigate("/packages")}
        >
          Browse Packages
        </Button>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="booking-step error-page">
        <h2>Unable to Check Availability</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="booking-step">

      <h2>1. Select Travel Date</h2>

      <section className="availability-box">

        <h3>{availability?.packageTitle}</h3>

        <p>
          <strong>Destination:</strong>{" "}
          {availability?.destination}
        </p>

        <p>
          <strong>Available Seats:</strong>{" "}
          {availability?.availableSeats}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {availability?.available
            ? "Available"
            : "Not Available"}
        </p>

        <p>
          {availability?.message}
        </p>

      </section>

      {availability?.available && (
        <>
          <p>
            Choose the starting date for your trip.
          </p>

          <DatePicker
            label="Travel Date"
            value={travelDates.startDate}
            onChange={(e) =>
              updateTravelDates(e.target.value)
            }
          />

          {travelDates.endDate && (
            <p>
              <strong>End Date:</strong>{" "}
              {travelDates.endDate}
            </p>
          )}

          <Button onClick={handleContinue}>
            Continue to Traveler Details
          </Button>
        </>
      )}

    </div>
  );
}

export default BookingDates;