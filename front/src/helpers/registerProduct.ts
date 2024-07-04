import axios from "axios";
import { IProduct } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function registerProduct(product: IProduct) {
  try {
    const res = await axios.post(`${API_URL}/products/register`, {
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default registerProduct;
