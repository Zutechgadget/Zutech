"use client";

import { useState, useEffect } from "react";
import { Button, Card, Form, FormControl, Row, Col } from "react-bootstrap";
import axios from "axios";
import "@/styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    description: "",
    image: "",
    price: "",
    ratings: "",
  });
  const [categoryForm, setCategoryForm] = useState({ name: "" });
  const [editingProduct, setEditingProduct] = useState(null); // Track selected product for editing

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8700/api/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8700/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handles Category Form Submission
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8700/api/categories", categoryForm);
    fetchCategories();
    setCategoryForm({ name: "" });
  };

  // Handles Input Changes for Category
  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  // Handles Input Changes for Product Form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles New Product Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) {
      alert("Please select a category");
      return;
    }
    try {
      await axios.post("http://localhost:8700/api/products", form);
      fetchProducts();
      setForm({
        name: "",
        category: "",
        stock: "",
        description: "",
        image: "",
        price: "",
        ratings: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handles Selecting a Product for Editing
  const handleEditClick = (product) => {
    setEditingProduct(product); // Set the product to edit
    setForm(product); // Populate the form with product details
  };

  // Handles Updating a Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8700/api/products/${editingProduct._id}`, form);
      fetchProducts();
      setEditingProduct(null); // Reset editing mode
      setForm({
        name: "",
        category: "",
        stock: "",
        description: "",
        image: "",
        price: "",
        ratings: "",
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Category Form */}
      <div className="mb-8 p-4 my-5 border border-gray-300 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
        <Form onSubmit={handleCategorySubmit} className="space-y-4">
          <FormControl
            name="name"
            placeholder="Category Name"
            onChange={handleCategoryChange}
            value={categoryForm.name}
            required
          />
          <Button type="submit" variant="primary" className="my-3">
            Add Category
          </Button>
        </Form>
      </div>

      {/* Product Form (Add or Update) */}
      <Form onSubmit={editingProduct ? handleUpdate : handleSubmit} className="border p-4 shadow rounded mb-4">
        <h2 className="text-xl font-semibold mb-4">{editingProduct ? "Update Product" : "Add Product"}</h2>
        
        <Form.Group className="mb-3">
          <Form.Control name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="price" placeholder="Price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="ratings" placeholder="Ratings" type="number" step="0.1" value={form.ratings} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </Button>
        
        {editingProduct && (
          <Button variant="secondary" className="ms-2" onClick={() => setEditingProduct(null)}>
            Cancel
          </Button>
        )}
      </Form>

      {/* Products List */}
      <h2 className="text-center mt-5">Products</h2>
      <Row className="mt-3">
        {products.map((product) => (
          <Col md={4} key={product._id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img variant="top" src={product.image} alt={product.name} className="p-3" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Stock: {product.stock}</Card.Text>
                <Card.Text>Ratings: {product.ratings}</Card.Text>
                <Button variant="warning" onClick={() => handleEditClick(product)}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
