import express from "express";
import conectarDB from "./config/db.js";
import prueba from "./prueba.js";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./routes/usuariosRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//Configurar cors
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

import { Server, Socket } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: { origin: process.env.FRONTEND_URL },
});
