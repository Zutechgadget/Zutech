const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://apple-nx.vercel.app"], // Allow both origins
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());

// Use Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Start Server
const port = process.env.PORT || 8700;
app.listen(port, () => console.log(`Server running on port ${port}...`));
