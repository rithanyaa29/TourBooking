import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import Input from "./Input";
import Button from "./Button";

function TravelerForm() {
  const navigate = useNavigate();

  const {
    travelerDetails,
    setTravelerDetails,
    cartItems
  } = useBooking();

  const handleChange = (e) => {
    setTravelerDetails({
      ...travelerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Please select a package first.");
      navigate("/packages");
      return;
    }

    if (!travelerDetails.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!travelerDetails.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(travelerDetails.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!travelerDetails.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!/^\d{10}$/.test(travelerDetails.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    navigate("/booking/summary");
  };

  return (
    <div className="booking-step">
      <h2>2. Traveler Details</h2>

      <form onSubmit={handleContinue}>

        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={travelerDetails.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={travelerDetails.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={travelerDetails.phone}
          onChange={handleChange}
          required
        />

        <Button type="submit">
          Continue
        </Button>

      </form>
    </div>
  );
}

export default TravelerForm;