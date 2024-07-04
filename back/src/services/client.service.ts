import RegisterClientDto from "../dtos/registerClient.dto";
import { Client } from "../entities/Client";
import { ClientRepository } from "../repositories/client.repository";
import { OrderRepository } from "../repositories/order.repository"; // Asegúrate de importar el repositorio de Order

export const checkClientExists = async (email: string): Promise<boolean> => {
  const user = await ClientRepository.findOneBy({ email });
  return !!user;
};

export const registerClientService = async (
  registerClientDto: RegisterClientDto
): Promise<Client> => {
  const client = await ClientRepository.create(registerClientDto);
  await ClientRepository.save(client);
  return client;
};

export const getClientsService = async (): Promise<Client[]> => {
  const clients = await ClientRepository.find();
  return clients;
};

export const updateClientService = async (
  id: string,
  updateData: Partial<RegisterClientDto>
): Promise<Client | null> => {
  await ClientRepository.update(id, updateData);
  const updatedClient = await ClientRepository.findOneBy({ id });
  return updatedClient;
};

export const deleteClientService = async (id: string): Promise<void> => {
  const orders = await OrderRepository.find({ where: { client: { id } } });

  for (const order of orders) {
    await OrderRepository.remove(order);
  }

  await ClientRepository.delete(id);
};