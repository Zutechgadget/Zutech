"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "./CartContext";
import { UserContext } from "@/context/UserContext";
import "@/styles/App.css";

const BigHead = () => {
  const [menu, setMenu] = useState(false);
  const { cart, showCart, setShowCart } = useCart();
  const { user } = useContext(UserContext); // Correctly destructure user

  useEffect(() => {
    if (user?.channelName) {
      document.body.setAttribute("data-channel-name", user.channelName);
    }
  }, [user]);

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
            <div className="col apple">
              <Link href="/" className="nav-link p-3 fs-1">
                <img
                  className="rounded"
                  style={{
                    width: "56px",
                    height: "56px",
                    opacity: 1, // Fixed opacity
                  }}
                  alt="Logo"
                  src="https://res.cloudinary.com/dvfiw24p4/image/upload/v1744818978/Screenshot_2025-04-16_at_16.54.47_bky0tu.png"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="col flex-d apple">
              <Link href="/store" className="nav-link p-3">Store</Link>
              <Link href="/mac" className="nav-link p-3">Mac</Link>
              <Link href="/iphone" className="nav-link p-3">iPhone</Link>
              <Link href="/ipad" className="nav-link p-3">iPad</Link>
              <Link href="/airpods" className="nav-link p-3">AirPods</Link>
              <Link href="/accessory" className="nav-link p-3">Accessories</Link>
              <Link href="/support" className="nav-link p-3">Support</Link>
            </div>

            {/* Search and Cart Icons */}
            <div className="col flex-d">
              <div className="py-2 px-5 cart d-flex">
                <button onClick={handleShow}>
                  <i className="bi fs-1 bi-cart3" style={{ fontSize: "24px", color: "skyblue" }}></i>
                  {cart.length > 0 && <span className="badge fs-6">{cart.length}</span>}
                </button>
                <div>
                  <Link href={user ? "/accessories" : "/login"} className="nav-link">
                    <i className="bx bx-user-circle fs-2 py-3" style={{ fontSize: "24px", color: "skyblue" }}></i>
                    {user && <span className="ms-2">{user.name || "User"}</span>}
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <div className="col flex-h">
              <div className="py-2 px-5 d-flex fox">
                <Link href={user ? "/accessories" : "/login"} className="nav-link">
                  <i className="bx bx-user-circle fs-1"  style={{ fontSize: "24px", color: "skyblue" }}></i>
                  {user && <span className="ms-2">{user.name || "User"}</span>}
                </Link>
                <i className="bx bx-menu fs-1 flex-h" onClick={handleMenu}  style={{ fontSize: "24px", color: "skyblue" }}></i>
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
              <Link href="/adminlogin" className="nav-link p-3">AirPods</Link>
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