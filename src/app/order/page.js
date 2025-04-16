"use client";

import "@/styles/App.css";
import { useState } from "react";
import { useCart } from "../../components/CartContext"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderPage = () => {
  const { cart, clearCart } = useCart(); 
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [showSuccessImage, setShowSuccessImage] = useState(false); // ✅ New state to show success image

  const handlePlaceOrder = () => {
    if (!address || !city) {
      alert("Please fill out your address before proceeding.");
      return;
    }

    setShowSuccessImage(true); // ✅ Show the image after successful order
    alert("Order placed successfully!");
    clearCart(); // ✅ Clear cart globally after placing order
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = total * 0.15;
  const finalTotal = total - discount + 50; 

  return (
    <div className="order-container">
      <h2>Your Order</h2>

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
            <h4>Total:  ${finalTotal.toLocaleString()}</h4>
          </>
        )}
      </div>

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

        {/* ✅ Show success image only after placing order */}
        {showSuccessImage && (
          <img 
            style={{
              width: "496px",
              height: "396px", 
              borderRadius: "30px 0px 0px 0px",
              opacity: "1",
              marginTop: "20px"
            }} 
            alt="Order Success"
            src="https://res.cloudinary.com/dvfiw24p4/image/upload/v1744825238/Screenshot_2025-04-16_at_18.39.32_cwjbyo.png"
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
