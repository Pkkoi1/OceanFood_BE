const express = require("express");
const router = express.Router();

// Import all route modules
const brandRoutes = require("./brandRoutes");
const categoryRoutes = require("./categoryRoutes");
const productTypeRoutes = require("./productTypeRoutes");
const productRoutes = require("./productRoutes");
const handbookRoutes = require("./handbookRoutes");
const cartRoutes = require("./cartRoutes");
const favoriteRoutes = require("./favoriteRoutes");

// Use routes
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);
router.use("/product-types", productTypeRoutes);
router.use("/products", productRoutes);
router.use("/handbook", handbookRoutes);
router.use("/cart", cartRoutes);
router.use("/favorites", favoriteRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "OceanFood API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

module.exports = router;
