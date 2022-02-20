import { OrderStatus } from "./enum-types";

export interface IOrderProduct {
  productName: string;
  quantity: number;
}

export interface IOrder {
  _id: string;
  orderProducts: IOrderProduct[];
  status: OrderStatus;
}

export interface CreateOrderDto {
  orderProducts: IOrderProduct[];
}

export interface CreateOrderResponseDto {
  message: string;
  data: IOrder;
  errors: { [key: string]: unknown };
}

export interface OrdersResponseDto {
  status: number;
  message: string;
  data: IOrder[];
  errors?: { [key: string]: unknown };
}
