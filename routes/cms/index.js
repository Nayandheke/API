const express = require("express");
const staffsRoutes = require("./staffs.routes");
const categoriesRoutes = require("./categories.routes");
const customerRoutes = require("./customer.routes");
const brandRoutes = require("./brands.routes");
const productRoutes = require("./products.routes");
const reviewsRoutes = require("./reviews.routes");
const ordersRoutes = require("./orders.routes");
const { adminUser } = require("../../lib");

const router = express.Router();

router.use("/staffs", adminUser, staffsRoutes);
router.use("/customers", customerRoutes);
router.use("/categories", categoriesRoutes);
router.use("/brands", brandRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
