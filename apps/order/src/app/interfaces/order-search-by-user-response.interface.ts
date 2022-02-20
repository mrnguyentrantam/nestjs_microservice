import { IOrderDocument } from "./order.interface";

export interface IOrderSearchByUserResponse {
  status: number;
  message: string;
  orders: IOrderDocument[];
}
