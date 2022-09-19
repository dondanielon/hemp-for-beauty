const { Router } = require("express");
const { Order, User, Op } = require("../db");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { ACCESS_TOKEN_SECRET, ADMIN_ROLE } = process.env;

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization" || "Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "unauthorized missing token" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "expired/invalid token" });
    req.user = user;
    next();
  });
}

const router = Router();

router.post("/create-order", async (req, res, next) => {
  const order = req.body;
  const id = order.paymentIntent.slice(3);

  try {
    const newOrder = await Order.create({
      id: id,
      amount: order.amount,
      clientEmail: order.email,
      clientPhone: order.phone,
      recipientName: order.recipientName,
      addressStreet: order.street,
      addressInt: order.int,
      addressCode: order.code,
      addressState: order.state,
      addressCity: order.city,
      addressCol: order.col,
    });

    if (!newOrder) {
      return res.status(400).json({ msg: "order creation failed" });
    }

    if (order.isUser) {
      const user = await User.findOne({ where: { email: order.email } });
      await user.addOrder(newOrder);
    }

    order.products.map(async (item) => {
      await newOrder.addProduct(item.id, { through: { quantity: item.qty } });
    });

    return res.status(201).json({ msg: "order created" });
  } catch (error) {
    next(error);
  }
});

router.get("/fetch/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.send({});

    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      status: order.status,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/manage", authMiddleware, async (req, res, next) => {
  const { email, status, date } = req.query;
  const { role } = req.user;

  if (role !== ADMIN_ROLE) {
    return res.status(401).json({ msg: "unauthorized missing permissions" });
  }

  try {
    let orders;
    if (email && status && date) {
      orders = await Order.findAll({
        where: {
          clientEmail: { [Op.iLike]: `%${email}%` },
          date: date,
          status: status,
        },
      });

      return res.status(200).json(orders);
    }

    if (email && status) {
      orders = await Order.findAll({
        where: {
          clientEmail: { [Op.iLike]: `%${email}%` },
          status: status,
        },
      });

      return res.status(200).json(orders);
    }

    if (email && date) {
      orders = await Order.findAll({
        where: {
          clientEmail: { [Op.iLike]: `%${email}%` },
          date: date,
        },
      });

      return res.status(200).json(orders);
    }

    if (date && status) {
      orders = await Order.findAll({ where: { date, status } });

      return res.status(200).json(orders);
    }

    if (email) {
      orders = await Order.findAll({
        where: { clientEmail: { [Op.iLike]: `%${email}%` } },
      });

      return res.status(200).json(orders);
    }

    if (date) {
      orders = await Order.findAll({ where: { date } });

      return res.status(200).json(orders);
    }

    if (status) {
      orders = await Order.findAll({ where: { status } });

      return res.status(200).json(orders);
    }

    orders = await Order.findAll();
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
