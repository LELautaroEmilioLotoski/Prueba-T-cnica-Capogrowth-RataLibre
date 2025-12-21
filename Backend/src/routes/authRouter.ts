
import { Router } from "express";
import { mlAuthLoginController, mlCallback} from "../controllers/authController";
import { requestLogger } from "../middlewares/requestLogger";

// Creamos una nueva instancia de un router de Express
const router = Router()

router.get("/auth/ml/login", requestLogger, mlAuthLoginController);
  
// Ruta de callback a la que Mercado Libre redirige luego del login exitoso
router.get("/auth/ml/callback", mlCallback);

  

// Exportamos el router para usarlo en la aplicación principal
export default router;

