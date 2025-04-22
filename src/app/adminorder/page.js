"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";
import { Button, Table, Form, Collapse, Card } from "react-bootstrap";
import "@/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [redemptionInfo, setRedemptionInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectionReason, setRejectionReason] = useState({});
  const [openItems, setOpenItems] = useState({});
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user?.isAdmin) {
      console.error("No token or not an admin, redirecting to login");
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
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
        setError(err.response?.data?.error || "Failed to load data");
        setLoading(false);
        if (err.response?.status === 401) {
          console.error("Unauthorized, clearing token and redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }
      }
    };

    fetchData();
  }, [router, user]);

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
      <BigHead />
      <div className="container mt-5">
        <h2 className="text-2xl font-bold mb-4">Transaction Receipts</h2>
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
      </div>
      <Footer />
    </div>
  );
}