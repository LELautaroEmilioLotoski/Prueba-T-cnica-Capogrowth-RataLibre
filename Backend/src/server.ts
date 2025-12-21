import app from './index';
import { AppDataSource } from "./config/data-source";
const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 PostgreSQL conectado");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error DB:", error);
  });
