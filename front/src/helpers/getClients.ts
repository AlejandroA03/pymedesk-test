import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getClients() {
  try {
    const res = await axios.get(`${API_URL}/clients`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default getClients;
