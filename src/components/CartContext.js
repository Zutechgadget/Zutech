"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // ✅ Define showCart state

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]); // ✅ Clears cart state
    localStorage.removeItem("cart"); // ✅ Clears from localStorage
  };

  return (
    <CartContext.Provider value={{ cart, setCart, showCart, setShowCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
