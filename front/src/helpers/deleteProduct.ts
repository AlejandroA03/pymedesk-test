import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function deleteProduct(id: number) {
  try {
    const res = await axios.delete(`${API_URL}/products/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default deleteProduct;
