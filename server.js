import express from "express";
import dotenv from "dotenv";    //npm install dotenv
dotenv.config(); //apply .env file
import cookieParser from 'cookie-parser'; 
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/accountRoutes.js";
import plantRoutes from './routes/plantRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js'
import orderRoutes from './routes/orderRoutes.js';

connectDB(); //connect to database

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api', userRoutes, plantRoutes, reviewRoutes, orderRoutes); //use routes
app.get('/', (req,res) => res.send('Server is ready'));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
