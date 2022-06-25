const { Router } = require("express");
const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");

const router = Router();
router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
