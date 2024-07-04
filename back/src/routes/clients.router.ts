import { Router } from "express";
import {
  registerClient,
  getClients,
  updateClient,
  deleteClient,
} from "../controllers/client.controller";

const clientsRouter = Router();

clientsRouter.post("/register", registerClient);
clientsRouter.get("/", getClients);  // Obtener todos los clientes
clientsRouter.put("/:id", updateClient);  // Actualizar información de un cliente específico
clientsRouter.delete("/:id", deleteClient);  // Eliminar un cliente

export default clientsRouter;