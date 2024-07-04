import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  getProductsService,
  registerProductService,
  updateProductService,
  deleteProductService,
} from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  }
);

export const registerProduct = catchedController(
  async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;
    const newProduct = await registerProductService({
      name,
      price,
      stock,
    });
    res.status(201).send(newProduct);
  }
);

export const updateProduct = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await updateProductService(Number(id), updateData);
    res.status(200).send(updatedProduct);
  }
);

export const deleteProduct = catchedController(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteProductService(Number(id));
  res.status(204).send();
});
