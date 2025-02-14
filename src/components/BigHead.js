"use client";

import React, { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";

const BigHead = () => {
  const [menu, setMenu] = useState(false);
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
              <Link href="/" className="nav-link p-3 fs-1">
                
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="col flex-d apple">
              <Link href="/store" className="nav-link p-3">Store</Link>
<Link href="/mac" className="nav-link p-3">Mac</Link>
<Link href="/iphone" className="nav-link p-3">iPhone</Link>
<Link href="/ipad" className="nav-link p-3">iPad</Link>
<Link href="/airpod" className="nav-link p-3">AirPods</Link>
<Link href="/accessories" className="nav-link p-3">Accessories</Link>
<Link href="/support" className="nav-link p-3">Support</Link>

            </div>

            {/* Search and Cart Icons */}
            <div className="col flex-d">
              <div className="py-2 px-5">
                <i className="bx bx-search fs-2"></i>
                <i className="bx bx-shopping-bag fs-2"></i>
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <i className="bx bx-menu fs-1 flex-h fox" onClick={handleMenu}></i>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menu && (
        <div className="container">
          <div className="row">
            <div className="col flex-h text-start">
              <Link href="/store" className="nav-link p-3">
                Store
              </Link>
              <Link href="/mac" className="nav-link p-3">
                Mac
              </Link>
              <Link href="/iphone" className="nav-link p-3">
                iPhone
              </Link>
              <Link href="/ipad" className="nav-link p-3">
                iPad
              </Link>
              <Link href="/airpods" className="nav-link p-3">
                AirPods
              </Link>
              <Link href="/accessories" className="nav-link p-3">
                Accessories
              </Link>
              <Link href="/support" className="nav-link p-3">
                Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigHead;
