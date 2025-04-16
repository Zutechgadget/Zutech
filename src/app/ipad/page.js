"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/page.module.css";

import Footer from "@/components/Footer";
import "@/styles/App.css"; 

import { useCart } from "../../components/CartContext";
 // Import the cart context

const products = [
  { id: 1, name: "MacBook Air 13-inch with M1 chip", price: 1050, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740561707/Rectangle_36_zc6dvx.png" },
  { id: 2, name: "MacBook Air 13-inch with M2 chip", price: 2000, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740562218/Rectangle_38_juhopr.png" },
  { id: 3, name: "MacBook Pro 13-inch", price: 3250, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740562218/Rectangle_37_qbqa8q.png" },
];

const productTwo = [
  { id: 4, name: "iPhone 14 Pro Max", price: 1900, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740577089/Rectangle_39_xkn6qq.png" },
  { id: 5, name: "iPhone 14", price: 800, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740577099/Rectangle_41_qyw56l.png" },
  { id: 6, name: "iPhone 14 Pro", price: 700, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740577089/Rectangle_39_xkn6qq.png" },
];

const productThree = [
  { id: 7, name: "iPad Pro 12.9 Inch", price: 1900, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740562644/Rectangle_42_tkahzj.png" },
  { id: 8, name: "iPad 10th Gen", price: 800, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740562644/Rectangle_44_gkzfwd.png" },
  { id: 9, name: "iPad Pro 11 Inch", price: 700, image: "https://res.cloudinary.com/drbiup2zg/image/upload/v1740562644/Rectangle_43_bswnax.png" },
];

const Store = () => {
  const { addToCart } = useCart(); // Use the cart context

  return (
    <div>


      <div className={`container ${styles.storeContainer}`}>
        {/* MacBooks Section */}
        <div className="mx-5 my-5">
          <h3>All Model Mac</h3>
          <div className="bar-3"></div>
        </div>
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>

        {/* iPhones Section */}
        <div className="mx-5 my-5">
          <h3>All Model iPhone</h3>
          <div className="bar-2"></div>
        </div>
        <div className="row">
          {productTwo.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>

        {/* iPads Section */}
        <div className="mx-5 my-5">
          <h3>All Model iPad</h3>
          <div className="bar-1"></div>
        </div>
        <div className="row">
          {productThree.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

  

    </div>
  );
};

// Reusable Product Card Component
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card ${styles.productCard}`}>
        <img src={product.image} className={`card-img-top ${styles.productImage}`} alt={product.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
