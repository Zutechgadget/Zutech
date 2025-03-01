"use client";

import React, { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import { useCart } from "./CartContext"; // ✅ Ensure the correct path
import "bootstrap-icons/font/bootstrap-icons.css";

const BigHead = () => {
  const [menu, setMenu] = useState(false);
  const { cart, showCart, setShowCart } = useCart(); // ✅ Ensure setShowCart is correctly accessed

  // ✅ Move `handleShow` below `useCart()` to ensure `setShowCart` is available
  const handleShow = () => {
    if (typeof setShowCart === "function") {
      setShowCart(true);
    } else {
      console.error("setShowCart is not defined or not a function.");
    }
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="d-flex w-100">
            {/* Apple Logo */}
            <div className="col apple">
              <Link href="/" className="nav-link p-3 fs-1"></Link>
            </div>

            {/* Navigation Links */}
            <div className="col flex-d apple">
              <Link href="/store" className="nav-link p-3">Store</Link>
              <Link href="/mac" className="nav-link p-3">Mac</Link>
              <Link href="/iphone" className="nav-link p-3">iPhone</Link>
              <Link href="/ipad" className="nav-link p-3">iPad</Link>
              <Link href="/airpod" className="nav-link p-3">AirPods</Link>
              <Link href="/accessories" className="nav-link p-3">Accessories</Link>
              <Link href="/admindashboard" className="nav-link p-3">Support</Link>
            </div>

            {/* Search and Cart Icons */}
            <div className="col flex-d">
              <div className="py-2 px-5 d-flex">
                {/* Cart Icon with Dynamic Count */}
                <button onClick={handleShow}>
                  <i className="bi fs-1 bi-cart3" style={{ color: "black" }}></i>
                  {cart.length > 0 && <span className="badge fs-6">{cart.length}</span>}
                </button>

                <div>
                  <Link href="/login" className="nav-link">
                    <i className='bx bx-user-circle fs-2'></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <div className="col flex-h">
              <div className="py-2 px-5 d-flex fox">
                <button onClick={handleShow}>
                  <i className="bi fs-1 bi-cart3" style={{ color: "black" }}></i>
                  {cart.length > 0 && <span className="badge fs-6">{cart.length}</span>}
                </button>
                <i className="bx bx-menu fs-1 flex-h" onClick={handleMenu}></i>
                <div>
                  <Link href="/login" className="nav-link">
                    <i className='bx bx-user-circle fs-1'></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menu && (
        <div className="container mx-3">
          <div className="row">
            <div className="col flex-h">
              <Link href="/store" className="nav-link p-3">Store</Link>
              <Link href="/mac" className="nav-link p-3">Mac</Link>
              <Link href="/iphone" className="nav-link p-3">iPhone</Link>
              <Link href="/ipad" className="nav-link p-3">iPad</Link>
              <Link href="/airpods" className="nav-link p-3">AirPods</Link>
              <Link href="/accessories" className="nav-link p-3">Accessories</Link>
              <Link href="/admindashboard" className="nav-link p-3">Support</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigHead;
