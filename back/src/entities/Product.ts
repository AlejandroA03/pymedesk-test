import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderProduct } from "./OrderProduct";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orderProducts: OrderProduct[];
}