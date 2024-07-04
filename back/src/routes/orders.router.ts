import { Router } from "express";
import { createOrder, getOrders, updateOrder, deleteOrder } from "../controllers/order.controller";

const ordersRouter = Router();

ordersRouter.post("/", createOrder);
ordersRouter.get("/", getOrders);  // Obtener todas las órdenes
ordersRouter.put("/:id", updateOrder);  // Actualizar una orden específica
ordersRouter.delete("/:id", deleteOrder);  // Eliminar una orden

export default ordersRouter;
