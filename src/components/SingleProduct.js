"use client";


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]); // All products
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected single product
  const [loading, setLoading] = useState(true);

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8700/api/products');
      setProducts(response.data); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch details of a single product
  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8700/api/products/${id}`);
      setSelectedProduct(response.data); // Set the selected product
    } catch (error) {
      console.error('Error fetching product details:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Show a loading message while fetching data
  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className='px-5 py-5 mx-5'>
      {/* Show all products */}
      {!selectedProduct && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map((product) => (
            <div
              key={product._id}
              className="product-flex"
              style={{
                border: '1px solid #ddd',
                padding: '20px',
                width: '250px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => fetchProductDetails(product._id)} // Click to fetch product details
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: 'auto' }}
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Ratings:</strong> {product.ratings}⭐
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Show single product details */}
      {selectedProduct && (
        <div
          style={{
            border: '1px solid #ddd',
            padding: '20px',
            maxWidth: '600px',
            margin: '20px auto',
            textAlign: 'center',
          }}
        >
          <button
            onClick={() => setSelectedProduct(null)} // Reset to show all products
            style={{
              background: '#ddd',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Back to Products
          </button>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
          />
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>
            <strong>Price:</strong> ${selectedProduct.price}
          </p>
          <p>
            <strong>Ratings:</strong> {selectedProduct.ratings}⭐
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;