const { Router } = require("express");
const { createUser, getUserInfo, loginUser } = require('../services/userServices')
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { ACCESS_TOKEN_SECRET } = process.env;

// Este es el middleware para verificar el token recibido por el header de la request
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401).json({ message: 'Unauthorized missing token', data: null });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Expired/Invalid token', data: null });
    req.user = user;
    next();
  });
};

const router = Router();

// Esta ruta llama la info de un usuario 
router.get("/", authMiddleware, async (req, res, next) => {
  const user = req.user;
  try {
    const { status, message, data } = await getUserInfo(user);
    return res.status(status).json({ message, data });
  } catch (error) {
    next(error);
  }
});

//Esta ruta es para crear un usuario
router.post("/", async (req, res, next) => {
  const params = req.body;
  try {
    const { status, message, data } = await createUser(params);
    return res.status(status).json({ message, data });
  } catch (error) {
    next(error);
  }
});

//Esta ruta es para login
router.post("/login", async (req, res, next) => {
  const params = req.body;
  try {
    const { status, message, data, accessToken } = await loginUser(params);
    return res.status(status).json({ message, data, accessToken });
  } catch (error) {
    next(error);
  }
});


module.exports = router;