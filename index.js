require("dotenv").config();

// remove this once you confirm it works
//console.log(process.env.JWT_SECRET);
// like, seriously. go delete that!

// inside index.js
const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const morgan = require("morgan");
server.use(morgan("dev"));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

// stuff above here

const apiRouter = require("./api");
server.use("/api", apiRouter);

// index.js

const { client } = require("./db");

// // stuff below here

// server.listen(PORT, "localhost", () => {
//   console.log("The server is up on port", PORT);
// });

server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);
  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
