import { orderProductDto } from "./orderProductDto";

export type orderDto = {
  id: string;
  userId: string;
  total: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  products: orderProductDto[];
}
