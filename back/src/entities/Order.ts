import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Client } from "./Client";
import { OrderProduct } from "./OrderProduct";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  delivery: boolean;

  @Column()
  payment: boolean;

  @Column()
  comments: string;

  @Column()
  date: Date;

  @ManyToOne(() => Client, client => client.orders)
  client: Client;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { cascade: true })
  orderProducts: OrderProduct[];
}