import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const {
    isLoggedIn,
    hasRegisteredUsers
  } = useAuth();

  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to={hasRegisteredUsers ? "/login" : "/signup"}
        state={{
          from: location.pathname
        }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;