import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function deleteClient(id: number) {
  try {
    const res = await axios.delete(`${API_URL}/clients/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default deleteClient;
