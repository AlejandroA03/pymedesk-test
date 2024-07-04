import RegisterProductDto from "../dtos/registerProduct.dto";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";
import { OrderProductRepository } from "../repositories/orderProduct.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export const getProductsService = async (): Promise<Product[]> => {
  return await ProductRepository.find();
};

export const registerProductService = async (
  registerProductDto: RegisterProductDto
): Promise<Product> => {
  const product = await ProductRepository.create(registerProductDto);
  await ProductRepository.save(product);
  return product;
};

export const updateProductService = async (
  id: number,
  updateData: Partial<RegisterProductDto>
): Promise<Product | null> => {
  await ProductRepository.update(id, updateData);
  const updatedProduct = await ProductRepository.findOneBy({ id });
  return updatedProduct;
};

export const deleteProductService = async (id: number): Promise<void> => {
  const productToDelete = await ProductRepository.findOne({ where: { id }, relations: ["orderProducts"] });
  if (!productToDelete) throw new Error("Product not found");

  await OrderProductRepository.delete({ product: { id } });

  await ProductRepository.delete(id);
};
