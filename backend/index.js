require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/partners", require("./routes/partnerRoutes"));
app.use("/api/catalogues", require("./routes/catalogueRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;

db.sequelize
  .sync({ alter: true }) // use { force: true } only in dev reset
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });