import { Router } from "express";
import {
  getProducts,
  registerProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.post("/register", registerProduct);  // Registrar un nuevo producto
router.put("/:id", updateProduct);  // Actualizar un producto específico
router.delete("/:id", deleteProduct);  // Eliminar un producto

export default router;
