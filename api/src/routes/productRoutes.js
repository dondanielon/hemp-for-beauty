const { Router } = require("express");
const { getAllProducts, getProductDetails } = require("../services/productServices");

const router = Router();

router.get("/:id", async (req, res, next) => {
  const params = req.params;
  try {
    const { status, message, data } = await getProductDetails(params);
    return res.status(status).json({ message, data })
  } catch (error) {
    next(error)
  }
});

//Esta ruta te trae todos los productos en la db 
router.get("/", async (req, res, next) => {
  const params = req.query;
  try {
    const { status, message, data } = await getAllProducts(params);
    return res.status(status).json({ message, data })
  } catch (error) {
    next(error)
  }
});
module.exports = router;