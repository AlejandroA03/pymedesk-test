import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  registerClientService,
  getClientsService,
  updateClientService,
  deleteClientService,
} from "../services/client.service";

export const registerClient = catchedController(
  async (req: Request, res: Response) => {
    const { email, name, address, cellphone } = req.body;
    const newUser = await registerClientService({
      email,
      name,
      address,
      cellphone,
    });
    res.status(201).send(newUser);
  }
);

export const getClients = catchedController(async (req: Request, res: Response) => {
  const clients = await getClientsService();
  res.status(200).send(clients);
});

export const updateClient = catchedController(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedClient = await updateClientService(id, updateData);
  res.status(200).send(updatedClient);
});

export const deleteClient = catchedController(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteClientService(id);
  res.status(204).send();
});
