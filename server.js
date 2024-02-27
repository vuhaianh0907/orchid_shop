import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/accountRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { startSocket } from "./socket/socketControllers.js";

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", userRoutes, plantRoutes, reviewRoutes);
app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));

const server = http.createServer(app);
startSocket(server);
server.listen(port, () => console.log(`Listening on port ${port}`));