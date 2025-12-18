import dotenv from "dotenv";
dotenv.config();
import express from 'express';
const cors = require('cors');
import pruebaRoutes from './routes/auth/prueba';
import authRouter from './routes/authRouter'

const app = express();

app.use(cors());
app.use(express.json());
app.use(pruebaRoutes)
app.use(authRouter)

export default app;

