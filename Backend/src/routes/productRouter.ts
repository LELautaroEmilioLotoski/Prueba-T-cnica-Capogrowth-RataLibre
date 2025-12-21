import { Router } from "express";
import { productMlController } from "../controllers/productController";
import { verifyToken } from "../middlewares/verifyToken"

const router = Router();

router.get("/products/:id", verifyToken, productMlController)

export default router
