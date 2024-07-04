import { Request, Response } from "express";
import { createOrderService, getOrdersService, updateOrderService, deleteOrderService } from "../services/order.service";
import { catchedController } from "../utils/catchedController";

export const createOrder = catchedController(
  async (req: Request, res: Response) => {
    const { products, userId, delivery, payment, comments, status } = req.body;
    const newOrder = await createOrderService({ userId, products, delivery, payment, comments, status });
    res.send(newOrder);
  }
);

export const getOrders = catchedController(
  async (req: Request, res: Response) => {
    const orders = await getOrdersService();
    res.status(200).send(orders);
  }
);

export const updateOrder = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedOrder = await updateOrderService(parseInt(id), updateData);
    res.status(200).send(updatedOrder);
  }
);

export const deleteOrder = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteOrderService(Number(id));
    res.status(204).send();
  }
);