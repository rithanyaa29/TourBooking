import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { currentUser, isLoggedIn } = useAuth();

  return (
    <main className="home">
      {isLoggedIn && (
        <div className="welcome-strip">
          <span>✨</span>
          <div>
            <strong>Welcome back, {currentUser.username}!</strong>
            <p>Your next adventure is waiting for you.</p>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">YOUR JOURNEY STARTS HERE</p>

          <h1>
            Explore the world.
            <br />
            Create unforgettable memories.
          </h1>

          <p className="hero-description">
            Discover beautiful destinations, thoughtfully planned travel
            packages and memorable experiences across India with Wanderlah.
          </p>

          <div className="hero-actions">
            <Link to="/packages" className="button">
              Explore Packages
            </Link>

            {!isLoggedIn && (
              <Link to="/signup" className="hero-secondary-button">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="highlight-card">
          <span>🌍</span>
          <div>
            <h3>Beautiful Destinations</h3>
            <p>Explore multiple places and experiences across India.</p>
          </div>
        </div>

        <div className="highlight-card">
          <span>💰</span>
          <div>
            <h3>Smart Travel Deals</h3>
            <p>Compare packages and choose a trip that fits your budget.</p>
          </div>
        </div>

        <div className="highlight-card">
          <span>⭐</span>
          <div>
            <h3>Simple Booking</h3>
            <p>Move from package selection to confirmation in clear steps.</p>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-heading">
          <p>WHY WANDERLAH?</p>
          <h2>Travel made simple</h2>
          <span>
            Everything you need for a smooth and memorable journey.
          </span>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <span>🧭</span>
            <h3>Easy Planning</h3>
            <p>
              Discover destinations, compare packages and plan your trip
              without complicated steps.
            </p>
          </div>

          <div className="why-card">
            <span>💰</span>
            <h3>Great Value</h3>
            <p>
              Find carefully selected travel packages at student-friendly
              prices.
            </p>
          </div>

          <div className="why-card">
            <span>🛡️</span>
            <h3>Trusted Booking</h3>
            <p>
              Login when you are ready and keep your confirmed bookings in one
              place.
            </p>
          </div>
        </div>

        <div className="why-button-container">
          <Link to="/packages" className="button explore-button">
            Explore Packages →
          </Link>
        </div>
      </section>

      <section className="cta-section">
        <p>START YOUR JOURNEY</p>
        <h2>Your next adventure is waiting.</h2>
        <span>
          Browse destinations today and book whenever you are ready.
        </span>
      </section>
    </main>
  );
}

export default Home;
