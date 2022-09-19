require("dotenv").config();
const { Router } = require("express");
const userRouter = require("./user");
const productRouter = require("./product");
const shipmentRouter = require("./shipment");
const paymentRouter = require("./payments");
const orderRouter = require("./order");

const router = Router();
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/shipment", shipmentRouter);
router.use("/payment", paymentRouter);
router.use("/order", orderRouter);

module.exports = router;
