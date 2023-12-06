import express from "express";
const port = 5000;
import products from "./products.js";

const app = express();

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
