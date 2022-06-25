const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");

const server = express();
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());

server.use("/api", router);

//ERROR CATCHING ENDWARE
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
