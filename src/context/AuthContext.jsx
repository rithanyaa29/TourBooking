import { createContext, useContext, useState } from "react";

const USERS_KEY = "wanderlahUsers";
const CURRENT_USER_KEY = "wanderlahCurrentUser";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const readCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
  } catch {
    return null;
  }
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(readUsers);
  const [currentUser, setCurrentUser] = useState(readCurrentUser);

  const signup = ({ username, email, password }) => {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername || !cleanEmail || !password) {
      return {
        success: false,
        message: "Please fill all fields."
      };
    }

    const usernameExists = users.some(
      (user) => user.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === cleanEmail
    );

    if (usernameExists) {
      return {
        success: false,
        message: "Username already exists."
      };
    }

    if (emailExists) {
      return {
        success: false,
        message: "Email is already registered."
      };
    }

    const newUser = {
      id: Date.now(),
      username: cleanUsername,
      email: cleanEmail,
      password
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    const safeUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };

    setCurrentUser(safeUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return {
      success: true,
      user: safeUser
    };
  };

  const login = ({ identifier, password }) => {
    const value = identifier.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.username.toLowerCase() === value ||
        item.email.toLowerCase() === value
    );

    if (!user || user.password !== password) {
      return {
        success: false,
        message: "Invalid username/email or password."
      };
    }

    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    setCurrentUser(safeUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return {
      success: true,
      user: safeUser
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const value = {
    users,
    currentUser,
    isLoggedIn: Boolean(currentUser),
    hasRegisteredUsers: users.length > 0,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
