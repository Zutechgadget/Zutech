"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token"); // Clear token
    setUser(null); // Clear user from context
    router.push("/login"); // Redirect to login
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}