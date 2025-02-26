"use client";  // ✅ Ensure this is a client component

import "@/styles/App.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

const OrderPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cart, setCart] = useState([]);

  // Load cart from local storage (assuming cart is stored there)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handlePlaceOrder = () => {
    if (!address || !city) {
      alert("Please fill out your address before proceeding.");
      return;
    }

    alert("Order placed successfully!");
    // Here you can send order data to your backend

    // Clear cart after order is placed
    localStorage.removeItem("cart");
    setCart([]);
  };

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = total * 0.15; // 15% discount
  const finalTotal = total - discount;

  return (
    <div className="order-container">
      <h2>Your Order</h2>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: "50px", height: "50px", marginRight: "10px", borderRadius: "5px" }} 
                  />
                  <span>{item.name} -  ${item.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <hr />
            <p>Subtotal:  ${total.toLocaleString()}</p>
            <p>Discount (-15%):  ${discount.toLocaleString()}</p>
            <p>Delivery Fee:  $50.00</p>
            <h4>Total:  ${(finalTotal + 500).toLocaleString()}</h4>
          </>
        )}
      </div>

      {/* Address Form */}
      <div className="address-form">
        <h3>Delivery Address</h3>
        <input 
          type="text" 
          placeholder="Full Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Port Harcourt">Port Harcourt</option>
          <option value="Ibadan">Ibadan</option>
          <option value="Kano">Kano</option>
          <option value="Benin City">Benin City</option>
        </select>

        <button onClick={handlePlaceOrder} className="btn btn-primary">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
