export interface IProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface IOrder {
  id?: number;
  status: string;
  date: Date;
  products: IProduct[];
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  address: string;
  cellphone: string;
}
