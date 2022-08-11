const { Router } = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { ACCESS_TOKEN_SECRET, SALT_ROUNDS, CRYPT_KEY, ADMIN_ROLE } = process.env;

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

// Esta ruta llama la info de un usuario 
router.get("/", authMiddleware, async (req, res, next) => {
  const { email } = req.user;
  try {
    const userInfo = await User.findOne({ where: { email } });
    if (!userInfo) return res.status(404).json({ msg: "email not found", content: null });

    const data = {
      id: userInfo.id,
      email: userInfo.email,
      firstName: userInfo.firstName
    };

    return res.status(200).json({ msg: "email found", content: data });
  } catch (error) {
    next(error);
  }
});

//Esta ruta es para crear un usuario
router.post("/create", async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try { 
    const emailInUse = await User.findOne({ where: { email: email.toLowerCase() } });
    if (emailInUse) return res.status(200).json({ msg: "email en uso", content: null });

    const hash = await bcrypt.hash(`${password}${CRYPT_KEY}`, parseInt(SALT_ROUNDS));
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hash,
      firstName,
      lastName
    })

    return res.status(201).json({ msg: "usuario creado", content: newUser.email });
  } catch (error) {
    next(error);
  }
});

//Esta ruta es para login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(401).json({ msg: "email no registrado", content: null });

    const passwordMatch = await bcrypt.compare(`${password}${CRYPT_KEY}`, user.password);
    if (passwordMatch) {
      const authUser = {
        email: user.email,
        name: user.firstName,
        role: user.role
      };

      const token = jwt.sign(authUser, ACCESS_TOKEN_SECRET);
      return res.status(200).json({ msg: "inicio de sesion", content: token });
    } else {
      return res.status(401).json({ msg: "contraseña incorrecta", content: null });
    }
  } catch (error) {
    next(error);
  }
});

//Esta ruta es para traer todos los usuarios
router.get("/all", authMiddleware, async (req, res, next) => {
  const { role } = req.user;
  if ( role !== ADMIN_ROLE ) return res.status(401).json({ msg: "unauthorized missing permissions", content: null });
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["firstName", "ASC"]]
    });
    return res.status(200).json({ msg: "users list", content: allUsers });
  } catch (error) {
    next(error);
  }
});


module.exports = router;