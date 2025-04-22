"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Button, Card, Form, FormControl, Row, Col, Table, Navbar, Nav, Container, Collapse } from "react-bootstrap";
import SingleProduct from "../../components/SingleProduct";
import "@/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDashboard() {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [orders, setOrders] = useState([]);
  const [redemptionInfo, setRedemptionInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const [editingProduct, setEditingProduct] = useState(null);
  const [rejectionReason, setRejectionReason] = useState({});
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user?.isAdmin) {
      console.error("No token or not an admin, redirecting to login");
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const dashboardResponse = await axios.get("https://zutech-api.onrender.com/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(dashboardResponse.data.admins);

        const categoriesResponse = await axios.get("https://zutech-api.onrender.com/api/category");
        setCategories(categoriesResponse.data);

        const productsResponse = await axios.get("https://zutech-api.onrender.com/api/products");
        setProducts(productsResponse.data);

        const ordersResponse = await axios.get("https://zutech-api.onrender.com/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersResponse.data);

        const redemptionResponse = await axios.get("https://zutech-api.onrender.com/api/admin/redemptionInfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRedemptionInfo(redemptionResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load dashboard");
        setLoading(false);
        if (err.response?.status === 403 || err.response?.status === 401) {
          console.error("Unauthorized, clearing token and redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }
      }
    };

    fetchData();
  }, [router, user]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://zutech-api.onrender.com/api/category", categoryForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryForm({ name: "" });
      const { data } = await axios.get("https://zutech-api.onrender.com/api/category");
      setCategories(data);
    } catch (error) {
      console.error("Error adding category:", error.response?.data?.error || error.message);
      alert("Failed to add category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://zutech-api.onrender.com/api/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = await axios.get("https://zutech-api.onrender.com/api/category");
      setCategories(data);
    } catch (error) {
      console.error("Error deleting category:", error.response?.data?.error || error.message);
      alert("Failed to delete category");
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) {
      alert("Please select a category");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const requestData = {
        name: form.name,
        categoryId: form.category,
        stock: Number(form.stock),
        description: form.description,
        image: form.image,
        price: Number(form.price),
        ratings: Number(form.ratings) || 0,
      };
      await axios.post("https://zutech-api.onrender.com/api/products", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        name: "",
        category: "",
        stock: "",
        description: "",
        image: "",
        price: "",
        ratings: "",
      });
      const { data } = await axios.get("https://zutech-api.onrender.com/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Error adding product:", error.response?.data?.error || error.message);
      alert("Failed to add product");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      category: product.categoryId?._id || product.categoryId || "",
      stock: product.stock || "",
      description: product.description || "",
      image: product.image || "",
      price: product.price || "",
      ratings: product.ratings || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const requestData = {
        name: form.name,
        categoryId: form.category,
        stock: Number(form.stock),
        description: form.description,
        image: form.image,
        price: Number(form.price),
        ratings: Number(form.ratings) || 0,
      };
      await axios.put(`https://zutech-api.onrender.com/api/products/${editingProduct._id}`, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingProduct(null);
      setForm({
        name: "",
        category: "",
        stock: "",
        description: "",
        image: "",
        price: "",
        ratings: "",
      });
      const { data } = await axios.get("https://zutech-api.onrender.com/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Error updating product:", error.response?.data?.error || error.message);
      alert("Failed to update product");
    }
  };

  const approveOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://zutech-api.onrender.com/api/orders/${orderId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Order approved:", response.data);
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: "Approved" } : order
        )
      );
    } catch (err) {
      console.error("Error approving order:", err);
      if (err.response?.status === 401) {
        console.error("Unauthorized, clearing token and redirecting to login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        setError(err.response?.data?.error || "Failed to approve order");
      }
    }
  };

  const approveRedemption = async (redemptionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://zutech-api.onrender.com/api/admin/redemptionInfo/${redemptionId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Redemption approved:", response.data);
      setRedemptionInfo(
        redemptionInfo.map((redemption) =>
          redemption._id === redemptionId ? { ...redemption, status: "approved" } : redemption
        )
      );
    } catch (err) {
      console.error("Error approving redemption:", err);
      if (err.response?.status === 401) {
        console.error("Unauthorized, clearing token and redirecting to login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        setError(err.response?.data?.error || "Failed to approve redemption");
      }
    }
  };

  const rejectRedemption = async (redemptionId) => {
    try {
      const token = localStorage.getItem("token");
      const reason = rejectionReason[redemptionId] || "No reason provided";
      const response = await axios.post(
        `https://zutech-api.onrender.com/api/admin/redemptionInfo/${redemptionId}/reject`,
        { reason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Redemption rejected:", response.data);
      setRedemptionInfo(
        redemptionInfo.map((redemption) =>
          redemption._id === redemptionId
            ? { ...redemption, status: "rejected", reason: response.data.reason }
            : redemption
        )
      );
    } catch (err) {
      console.error("Error rejecting redemption:", err);
      if (err.response?.status === 401) {
        console.error("Unauthorized, clearing token and redirecting to login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        setError(err.response?.data?.error || "Failed to reject redemption");
      }
    }
  };

  const toggleItems = (orderId) => {
    setOpenItems((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2>Error</h2>
        <p>{error}</p>
        <Button className="btn btn-primary" onClick={() => router.push("/login")}>
          Go to Login
        </Button>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    console.error("User is not admin or not loaded:", user);
    return (
      <div className="container mt-5">
        <h2>Access Denied</h2>
        <p>Only admins can access this page.</p>
        <Button className="btn btn-primary" onClick={() => router.push("/login")}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} href="/">
            <img
              className="rounded"
              style={{
                width: "56px",
                height: "56px",
                opacity: 1,
              }}
              alt="Logo"
              src="https://res.cloudinary.com/dvfiw24p4/image/upload/v1744818978/Screenshot_2025-04-16_at_16.54.47_bky0tu.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link disabled>Welcome, {user.name || "Admin"}!</Nav.Link>
              <Button variant="danger" size="sm" onClick={logout}>
                Log Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <Card className="p-4 mb-4 shadow-sm">
          <h5>Admin Users</h5>
          {admins.length > 0 ? (
            <ul>
              {admins.map((admin) => (
                <li key={admin._id}>
                  {admin.name} ({admin.email})
                </li>
              ))}
            </ul>
          ) : (
            <p>No admin users found.</p>
          )}
        </Card>

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
        </div>

        <Form onSubmit={editingProduct ? handleUpdate : handleSubmit} className="border p-4 shadow rounded mb-4">
          <h2 className="text-xl font-semibold mb-4">{editingProduct ? "Update Product" : "Add Product"}</h2>
          <Form.Group className="mb-3">
            <Form.Control name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select a category</option>
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

        <h2 className="text-center mt-5">Products</h2>
        <Row className="mt-3">
          {products.map((product) => (
            <Col md={4} key={product._id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img variant="top" src={product.image} alt={product.name} className="p-3" style={{ height: '200px', objectFit: 'cover' }} />
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

        <h2 className="text-2xl font-bold mb-4 mt-8">Transaction Receipts</h2>
        <div className="order-table-responsive">
          <Table striped bordered hover className="receipt-table d-none d-md-table">
            <thead className="bg-primary text-white">
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <>
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.userId?.name || "Unknown"}</td>
                      <td>{order.userId?.email || "Unknown"}</td>
                      <td>{order.address && order.city ? `${order.address}, ${order.city}` : "N/A"}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => toggleItems(order._id)}
                          aria-controls={`items-${order._id}`}
                          aria-expanded={openItems[order._id]}
                        >
                          {openItems[order._id] ? "Hide Items" : "Show Items"}
                        </Button>
                      </td>
                      <td>${order.totalAmount?.toLocaleString() || "0.00"}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.status !== "Approved" && (
                          <Button variant="success" onClick={() => approveOrder(order._id)}>
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                    <tr key={`${order._id}-collapse`}>
                      <td colSpan="8" className="p-0">
                        <Collapse in={openItems[order._id]}>
                          <div id={`items-${order._id}`} className="p-3 bg-light">
                            {order.items?.length > 0 ? (
                              <ul className="list-unstyled">
                                {order.items.map((item, index) => (
                                  <li key={index} className="d-flex align-items-center mb-2">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      style={{ width: "50px", height: "50px", marginRight: "10px", borderRadius: "5px" }}
                                    />
                                    <div>
                                      <strong>{item.name}</strong>
                                      <p className="mb-0">Price: ${item.price?.toLocaleString()}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No items available</p>
                            )}
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No orders available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="d-md-none">
            {orders.length > 0 ? (
              orders.map((order) => (
                <Card key={order._id} className="mb-3 shadow-sm">
                  <Card.Body>
                    <div className="mb-2">
                      <strong>Order ID:</strong> {order._id}
                    </div>
                    <div className="mb-2">
                      <strong>Name:</strong> {order.userId?.name || "Unknown"}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {order.userId?.email || "Unknown"}
                    </div>
                    <div className="mb-2">
                      <strong>Address:</strong> {order.address && order.city ? `${order.address}, ${order.city}` : "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Total Amount:</strong> ${order.totalAmount?.toLocaleString() || "0.00"}
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong> {order.status}
                    </div>
                    <div className="mb-2">
                      <Button
                        variant="link"
                        onClick={() => toggleItems(order._id)}
                        aria-controls={`items-${order._id}`}
                        aria-expanded={openItems[order._id]}
                      >
                        {openItems[order._id] ? "Hide Items" : "Show Items"}
                      </Button>
                      <Collapse in={openItems[order._id]}>
                        <div id={`items-${order._id}`} className="p-3 bg-light">
                          {order.items?.length > 0 ? (
                            <ul className="list-unstyled">
                              {order.items.map((item, index) => (
                                <li key={index} className="d-flex align-items-center mb-2">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: "50px", height: "50px", marginRight: "10px", borderRadius: "5px" }}
                                  />
                                  <div>
                                    <strong>{item.name}</strong>
                                    <p className="mb-0">Price: ${item.price?.toLocaleString()}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No items available</p>
                          )}
                        </div>
                      </Collapse>
                    </div>
                    <div>
                      {order.status !== "Approved" && (
                        <Button variant="success" onClick={() => approveOrder(order._id)}>
                          Approve
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p className="text-center">No orders available</p>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-8">Redemption Info</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Redemption ID</th>
              <th>Product</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {redemptionInfo.length > 0 ? (
              redemptionInfo.map((redemption) => (
                <tr key={redemption._id}>
                  <td>{redemption._id}</td>
                  <td>{redemption.productName}</td>
                  <td>{redemption.userName} ({redemption.userEmail})</td>
                  <td>${redemption.amount}</td>
                  <td>{redemption.status}</td>
                  <td>{redemption.reason || "-"}</td>
                  <td>
                    {redemption.status === "pending" && (
                      <>
                        <Button
                          variant="success"
                          className="me-2"
                          onClick={() => approveRedemption(redemption._id)}
                        >
                          Approve
                        </Button>
                        <Form.Control
                          type="text"
                          placeholder="Reason for rejection"
                          value={rejectionReason[redemption._id] || ""}
                          onChange={(e) =>
                            setRejectionReason({
                              ...rejectionReason,
                              [redemption._id]: e.target.value,
                            })
                          }
                          className="mb-2"
                        />
                        <Button
                          variant="danger"
                          onClick={() => rejectRedemption(redemption._id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No redemption info available
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <SingleProduct />
      </Container>

      <Footer>
        <Container>
          <Row>
            <Col md={4}>
              <h5>Contact</h5>
              <p>No 6 OlaAyeni off Medical Road Computer Village Ikeja Lagos Nigeria</p>
              <p><Link href="/contact">Contact US</Link></p>
            </Col>
            <Col md={4}>
              <h5>Products</h5>
              <ul className="list-unstyled">
                <li><Link href="/iphone/14-series">iPhone 14 Series</Link></li>
                <li><Link href="/iphone/13-series">iPhone 13 Series</Link></li>
                <li><Link href="/iphone/12-series">iPhone 12 Series</Link></li>
                <li><Link href="/iphone/se">iPhone SE</Link></li>
                <li><Link href="/ipad/pro">iPad Pro</Link></li>
                <li><Link href="/ipad">iPad</Link></li>
                <li><Link href="/ipad/air">iPad Air</Link></li>
                <li><Link href="/ipad/mini">iPad Mini</Link></li>
                <li><Link href="/macbook/air">MacBook Air</Link></li>
                <li><Link href="/macbook/pro">MacBook Pro</Link></li>
                <li><Link href="/imac">iMac</Link></li>
                <li><Link href="/mac/mini">Mac Mini</Link></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>About</h5>
              <p><Link href="/about">About Us</Link></p>
            </Col>
          </Row>
        </Container>
      </Footer>
    </div>
  );
}