import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const verifyToken = async () => {
        try {
          const response = await axios.get("https://zutech-api.onrender.com/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error("Token verification failed:", err);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }
      };
      verifyToken();
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};