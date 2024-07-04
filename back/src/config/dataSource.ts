import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { Client } from "../entities/Client";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { OrderProduct } from "../entities/OrderProduct";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  //dropSchema: true,
  logging: false,
  entities: [Client, Order, Product, OrderProduct],
  subscribers: [],
  migrations: [],
});
