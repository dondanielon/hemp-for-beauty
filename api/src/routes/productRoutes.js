const { Router } = require("express");
const { Product, Ingredient } = require("../db");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { ACCESS_TOKEN_SECRET, ADMIN_ROLE } = process.env;

// Este es el middleware para verificar el token recibido por el header de la request
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization" || "Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "unauthorized missing token" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "expired/invalid token" });
    req.user = user;
    next();
  });
};

const router = Router();

//Esta ruta te trae todos los productos en la db 
router.get("/", async (req, res, next) => {
  const { order, option } = req.query;
  try {
    const products = await Product.findAll({
      order: [[option, order]],
      include: { model: Ingredient, attributes: ["name", "description"], through: { attributes: [] } }
    });
    return res.status(200).json({ msg: "products list", content: products });
  } catch (error) {
    next(error);
  }
});

//Esta ruta es para agregar stock
router.patch("/add", authMiddleware, async (req, res, next) => {
  const { role } = req.user;
  if ( role !== ADMIN_ROLE ) return res.status(401).json({ msg: "unauthorized missing permissions", content: null });
  const { productId, quantity } = req.body;
  try {
    const productToPatch = await Product.findByPk(productId);
    if (!productToPatch) return res.status(404).json({ msg: "product not found", content: null });

    const total = productToPatch.stock + quantity;
    
    await Product.update(
      { stock: total },
      { where: { id: productId } }
    )
    return res.status(200).json({ msg: "product updated", content: { productId: productId, newStock: total } });
  } catch (error) {
    next(error);
  }
});

//Esta ruta es para remover stock
router.patch("/remove", authMiddleware, async (req, res, next) => {
  const { role } = req.user;
  if ( role !== ADMIN_ROLE ) return res.status(401).json({ msg: "unauthorized missing permissions", content: null });
  const { productId, quantity } = req.body;
  try {
    const productToPatch = await Product.findByPk(productId);
    if (!productToPatch) return res.status(404).json({ msg: "product not found", content: null });

    let total;
    if (productToPatch.stock < quantity) total = 0;
    else total = productToPatch.stock - quantity;

    await Product.update(
      { stock: total },
      { where: { id: productId } }
    )
    return res.status(200).json({ msg: "product updated", content: { productId: productId, newStock: total } });
  } catch (error) {
    next(error);
  }

});
module.exports = router;  