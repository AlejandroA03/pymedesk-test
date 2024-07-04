import { AppDataSource } from "../config/dataSource";
import { Client } from "../entities/Client";

export const ClientRepository = AppDataSource.getRepository(Client);