import axios from "axios";
import { IProduct } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function updateProduct(product: IProduct) {
  try {
    const res = await axios.put(`${API_URL}/products/${product.id}`, {
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default updateProduct;
