import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, product => product.orderProducts, { onDelete: "CASCADE" })
  product: Product;

  @ManyToOne(() => Order, order => order.orderProducts, { onDelete: "CASCADE" })
  order: Order;

  @Column()
  quantity: number;
}