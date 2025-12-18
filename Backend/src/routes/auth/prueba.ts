import { Router } from "express";
import { Request, Response } from "express";
const router = Router();

console.log("🔥 pruebaRoutes cargado");

router.get('/', (req: Request, res: Response) => {

    res.status(200).send('¡Hola Mundo con Express!');
})

export default router;