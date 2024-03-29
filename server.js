import express from "express";
import dotenv from "dotenv"; //npm install dotenv
dotenv.config(); //apply .env file
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
const portSocket = 5001;
import userRoutes from "./routes/accountRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { startSocket } from "./socket/socketControllers.js";
import http from "http";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
connectDB(); //connect to database

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", userRoutes, plantRoutes, reviewRoutes, orderRoutes); //use routes
app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));

app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
startSocket(server);
server.listen(portSocket, () => console.log(`Listening on port ${portSocket}`));
