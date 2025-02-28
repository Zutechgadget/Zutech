"use client";

import { useState, useEffect } from "react";
import { Button, Card, Form, FormControl, Row, Col } from "react-bootstrap";
import axios from "axios";
import "@/styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleProduct from "../../components/SingleProduct";


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
      const { data } = await axios.get("https://productapi-1-b6y2.onrender.com/api/category");
      setCategories(data);
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://productapi-1-b6y2.onrender.com/api/products"); // ✅ Store the response
      setProducts(response.data); // ✅ Correct way to access the data
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  // Handles Category Form Submission
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://productapi-1-b6y2.onrender.com/api/category",
        categoryForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored in localStorage
          },
        }
      );
      fetchCategories();
      setCategoryForm({ name: "" });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
  
    try {
      await axios.delete(`https://productapi-1-b6y2.onrender.com/api/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCategories(); // Refresh category list
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
        const requestData = {
            name: form.name,
            categoryId: form.category, // ✅ Ensure this is the correct field
            stock: form.stock,
            description: form.description,
            image: form.image,
            price: form.price,
            ratings: form.ratings
        };

        console.log("Sending Data:", requestData); // ✅ Debugging

        await axios.post("https://productapi-1-b6y2.onrender.com/api/products", requestData);
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
        console.error("Error adding product:", error.response?.data || error.message);
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
      await axios.put(`https://productapi-1-b6y2.onrender.com/api/products/${editingProduct._id}`, form);
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
  <option value="">Select a category</option> {/* Default empty option */}
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>{cat.name}</option>
  ))}
</Form.Select>
<ul className="list-group mt-3">
  {categories.map((category) => (
    <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
      {category.name}
      <Button variant="danger" size="sm" onClick={() => handleDeleteCategory(category._id)}>
        Delete
      </Button>
    </li>
  ))}
</ul>

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

      <SingleProduct/>
    </div>
  );
}
