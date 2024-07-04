import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderProduct } from "../entities/OrderProduct";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { ClientRepository } from "../repositories/client.repository";
import { OrderProductRepository } from "../repositories/orderProduct.repository";

export const createOrderService = async (
  createOrderDto: CreateOrderDto
): Promise<Order> => {
  const productsF: OrderProduct[] = [];

  for await (const item of createOrderDto.products) {
    const product = await ProductRepository.findOneBy({ id: item.id });
    if (!product) throw new Error(`Product with ID ${item.id} not found`);
    if (product.stock < item.quantity) throw new Error(`Not enough stock for product with ID ${item.id}`);

    product.stock -= item.quantity;
    await ProductRepository.save(product);

    const orderProduct = OrderProductRepository.create({
      product,
      quantity: item.quantity
    });
    productsF.push(orderProduct);
  }

  const userF = await ClientRepository.findOneBy({ id: createOrderDto.userId });
  if (!userF) throw new Error("Client not found");

  const newOrder = OrderRepository.create({
    status: "pending",
    date: new Date(),
    client: userF,
    orderProducts: productsF,
    delivery: createOrderDto.delivery,
    payment: createOrderDto.payment,
    comments: createOrderDto.comments
  });

  await OrderRepository.save(newOrder);
  return newOrder;
};

export const getOrdersService = async (): Promise<Order[]> => {
  return await OrderRepository.find({ relations: ["client", "orderProducts", "orderProducts.product"] });
};

export const updateOrderService = async (
  id: number,
  updateData: Partial<CreateOrderDto>
): Promise<Order | null> => {
  const orderToUpdate = await OrderRepository.findOne({ where: { id }, relations: ["orderProducts", "client"] });
  if (!orderToUpdate) throw new Error("Order not found");

  if (updateData.products) {
    await OrderProductRepository.remove(orderToUpdate.orderProducts);

    const orderProducts = await Promise.all(updateData.products.map(async (item) => {
      const product = await ProductRepository.findOneBy({ id: item.id });
      if (!product) throw new Error(`Product with ID ${item.id} not found`);
      if (product.stock < item.quantity) throw new Error(`Not enough stock for product with ID ${item.id}`);

      product.stock -= item.quantity;
      await ProductRepository.save(product);

      const orderProduct = OrderProductRepository.create({
        product,
        quantity: item.quantity
      });
      return orderProduct;
    }));

    orderToUpdate.orderProducts = orderProducts;
  }

  if (updateData.userId) {
    const client = await ClientRepository.findOneBy({ id: updateData.userId });
    if (!client) throw new Error(`Client with ID ${updateData.userId} not found`);
    orderToUpdate.client = client;
  }

  if (updateData.delivery !== undefined) {
    orderToUpdate.delivery = updateData.delivery;
  }

  if (updateData.payment !== undefined) {
    orderToUpdate.payment = updateData.payment;
  }

  if (updateData.comments !== undefined) {
    orderToUpdate.comments = updateData.comments;
  }

  if (updateData.status !== undefined) {
    orderToUpdate.status = updateData.status;
  }

  await OrderRepository.save(orderToUpdate);
  return orderToUpdate;
};

export const deleteOrderService = async (id: number): Promise<void> => {
  const orderToDelete = await OrderRepository.findOne({ where: { id }, relations: ["orderProducts"] });
  if (!orderToDelete) throw new Error("Order not found");

  await OrderProductRepository.remove(orderToDelete.orderProducts);

  await OrderRepository.delete(id);
};
