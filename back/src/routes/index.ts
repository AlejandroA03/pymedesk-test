import { Router } from "express";
import clientsRouter from "./clients.router";
import ordersRouter from "./orders.router";
import productsRouter from "./products.router";

const router = Router();

router.use("/clients", clientsRouter);
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);

export default router;
