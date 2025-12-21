import dotenv from "dotenv";
dotenv.config();
import express from 'express';
const cors = require('cors');
import authRouter from './routes/authRouter'
import productRouter from './routes/productRouter'
import "reflect-metadata"

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter)
app.use(productRouter)

export default app;

