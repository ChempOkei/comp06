import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("auth-user")),
  );
  const [token, setToken] = useState(() => localStorage.getItem("auth-token"));
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem("is-auth"));

  const login = (user, token) => {
    localStorage.setItem("auth-user", JSON.stringify(user));
    localStorage.setItem("auth-token", token);
    localStorage.setItem("is-auth", "true");
    setUser(user);
    setToken(token);
    setIsAuth("true");
  };

  const logout = () => {
    localStorage.removeItem("auth-user");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("is-auth");
    setUser(null);
    setToken(null);
    setIsAuth(null);
  };

  const provided = {
    user,
    token,
    isAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={provided}>{children}</AuthContext.Provider>
  );
};
