export interface CreateOrderDto {
  userId: string;
  status: string;
  delivery: boolean;
  payment: boolean;
  comments: string;
  products: { id: number; quantity: number }[];
}