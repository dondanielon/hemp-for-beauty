const { Router } = require("express");
const express = require("express");
require("dotenv").config();
const { Product } = require("../db");
const { updateOrderStatus } = require("./controllers");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = Router();

//===========================CONTROLADORES UTILIZADOS EN LAS RUTAS

const calculateOrderAmount = async (items) => {
  let amount = 0;
  await Promise.all(
    items.map(async (item) => {
      const product = await Product.findByPk(item.id);
      amount += product.price * item.quantity * 100;
    })
  );
  return amount;
};

//=============================RUTAS

router.post("/create-intent", async (req, res, next) => {
  const items = req.body;
  try {
    const amount = await calculateOrderAmount(items);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "mxn",
      automatic_payment_methods: {
        enabled: false,
      },
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    const signature = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_ENDPOINT_SECRET
      );
    } catch (error) {
      console.log(`⚠️  Webhook signature verification failed.`, error.message);
      return res.status(400);
    }

    try {
      const orderId = event.data.object.id.slice(3);
      if (event.type === "payment_intent.payment_failed") {
        await updateOrderStatus(orderId, "failed");
      } else if (event.type === "payment_intent.processing") {
        await updateOrderStatus(orderId, "processing");
      } else if (event.type === "payment_intent.succeeded") {
        await updateOrderStatus(orderId, "succeeded");
      } else if (event.type === "payment_intent.created") {
        console.log("PAYMENT INTENT CREATED");
      } else console.log(event.type);

      return res.send("acknowledge");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
