import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, hasRegisteredUsers, isLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return null;
  }

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password) {
      alert("Please fill all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    const result = signup({ username, email, password });

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(`Welcome to Wanderlah, ${result.user.username}!`);
    const destination = location.state?.from || "/";
    navigate(destination, { replace: true });
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">✈️</div>
        <p className="auth-eyebrow">WELCOME TO WANDERLAH</p>
        <h1>Create your account</h1>
        <p className="auth-description">
          Sign up once and start planning your next memorable journey.
        </p>

        <form onSubmit={handleSignup}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="button">
            Create Account
          </button>
        </form>

        {hasRegisteredUsers && (
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </main>
  );
}

export default Signup;
