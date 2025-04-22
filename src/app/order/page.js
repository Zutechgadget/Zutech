"use client";

import "@/styles/App.css";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { UserContext } from "@/context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const OrderPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showSuccessImage, setShowSuccessImage] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = total * 0.15;
  const finalTotal = total - discount + 50;

  const handlePayNow = () => {
    if (!user) {
      alert("Please log in to place an order.");
      router.push("/login");
      return;
    }
    if (!address || !city) {
      alert("Please fill out your address before proceeding.");
      return;
    }
    setShowAccountDetails(true);
    setShowConfirmButton(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      const order = {
        address,
        city,
        items: cart,
        totalAmount: finalTotal,
        status: "Pending"
      };

      const response = await axios.post("https://zutech-api.onrender.com/api/orders", order, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        clearCart();
        setShowSuccessImage(true);
        setShowAccountDetails(false);
        setShowConfirmButton(false);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        alert(`Failed to place order: ${error.response?.data?.error || error.message}`);
      }
    }
  };

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
                  <span>{item.name} - ${item.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <hr />
            <p>Subtotal: ${total.toLocaleString()}</p>
            <p>Discount (-15%): ${discount.toLocaleString()}</p>
            <p>Delivery Fee: $50.00</p>
            <h4>Total: ${finalTotal.toLocaleString()}</h4>
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

        {!showAccountDetails && (
          <button onClick={handlePayNow} className="btn btn-primary mt-3">
            Pay Now
          </button>
        )}

        {showAccountDetails && (
          <div className="mt-3">
            <h5>Make Payment To:</h5>
            <p><strong>Bank:</strong> Zutech Bank</p>
            <p><strong>Account Name:</strong> Zutech Stores</p>
            <p><strong>Account Number:</strong> 1234567890</p>

            {showConfirmButton && (
              <button onClick={handleConfirmOrder} className="btn btn-success mt-3">
                Confirm Order
              </button>
            )}
          </div>
        )}

        {showSuccessImage && (
          <img
            className="w-100"
            style={{
              width: "496px",
              height: "496px",
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