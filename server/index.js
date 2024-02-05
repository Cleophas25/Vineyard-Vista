import express from "express";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import postRouter from "./routes/postRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import "express-async-handler";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

dotenv.config();
const app = express();

const port = 3000;

app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("connected to database");
    app.listen(port, () =>
      console.log(`server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

start();
