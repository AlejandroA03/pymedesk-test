import axios from "axios";
import { IClient } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function registerClient(client: IClient) {
  try {
    const res = await axios.post(`${API_URL}/clients/register`, {
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

export default registerClient;
