import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProductsDB() {
  try {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default getProductsDB;
