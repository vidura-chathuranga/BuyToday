import express from "express";
import connectDB from "./configs/db.js";
import products from "./products.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// connect DB
connectDB();

const port = process.env.PORT || 6000;
app.use((req, res, next) => {
  console.log(`${req.method} =======> ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  console.log("WELCOME TO BACKNED API");
  res.send("WELCOME TO BACKNED API");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.send(product);
});

app.listen(port, () => {
  console.log(`Server up on PORT : ${port}`);
  
});
