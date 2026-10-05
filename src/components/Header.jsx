import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { currentUser, logout, hasRegisteredUsers } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="header">
      <NavLink to="/" className="brand-link">
        <h1>✈️ Wanderlah</h1>
      </NavLink>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/packages">Packages</NavLink>
        {currentUser && <NavLink to="/bookings">Bookings</NavLink>}

        {currentUser ? (
          <>
            <NavLink to="/profile" className="profile-nav-link">
              Profile · {currentUser.username}
            </NavLink>
            <button className="header-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : hasRegisteredUsers ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <NavLink to="/signup">Sign Up</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
