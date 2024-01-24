import path from "path";
import express from "express";
import connectDB from "./configs/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import UploadRoutes from "./routes/upload.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// connect DB
connectDB();

const port = process.env.PORT || 6000;

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${req.method} =======> ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  console.log("WELCOME TO BACKNED API");
  res.send("WELCOME TO BACKNED API");
});

// product routes
app.use("/api/products", productsRoutes);

// users ro
app.use("/api/users", userRoutes);

// order routes
app.use("/api/orders", orderRoutes);

// upload routes
app.use("/api/uploads", UploadRoutes);

// paypal routes
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve('../'); //set __dirname to root directory

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server up on PORT : ${port}`);
});
