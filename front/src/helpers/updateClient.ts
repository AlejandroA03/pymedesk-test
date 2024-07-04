import axios from "axios";
import { IClient } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function updateClient(client: IClient) {
  try {
    const res = await axios.put(`${API_URL}/clients/${client.id}`, {
      name: client.name,
      email: client.email,
      cellphone: client.cellphone,
      address: client.address,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default updateClient;
