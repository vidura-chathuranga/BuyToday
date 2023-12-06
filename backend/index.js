import express from "express";
import connectDB from "./configs/db.js";

import dotenv from 'dotenv';
import productsRoutes from './routes/products.routes.js';

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

// product routes
app.use('/api/products',productsRoutes);


app.listen(port, () => {
  console.log(`Server up on PORT : ${port}`);
  
});
