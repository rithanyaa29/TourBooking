import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-avatar">
          {currentUser.username.charAt(0).toUpperCase()}
        </div>

        <p className="profile-eyebrow">YOUR WANDERLAH PROFILE</p>

        <h1>Welcome back, {currentUser.username}! ✨</h1>

        <p className="profile-message">
          We are happy to have you here. Your next adventure is just a few
          clicks away.
        </p>

        <div className="profile-details">
          <div>
            <span>Username</span>
            <strong>{currentUser.username}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{currentUser.email}</strong>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="button"
            onClick={() => navigate("/packages")}
          >
            Explore Packages
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
