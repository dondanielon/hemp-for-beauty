const { Router } = require("express");
const axios = require("axios");
const { getRequestRatePayload } = require("../payloads");
require("dotenv").config();

const router = Router();

router.post("/rate", async (req, res, next) => {
  const data = req.body;
  const payload = getRequestRatePayload(data);
  try {
    const config = {
      method: "POST",
      url: `${process.env.SHIPPING_API_ENDPOINT}/ship/rate/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SHIPPING_TOKEN}`,
      },
      data: payload,
    };

    const response = await axios(config);

    return res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get("/states-codes", async (req, res, next) => {
  try {
    const config = {
      method: "GET",
      url: `${process.env.SHIPPING_QUERIES_ENDPOINT}/state?country_code=MX`,
    };
    const response = await axios(config);

    const list = response.data.data.map((item) => {
      const stateInfo = { name: item.name, code: item.code_2_digits };
      return stateInfo;
    });

    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
