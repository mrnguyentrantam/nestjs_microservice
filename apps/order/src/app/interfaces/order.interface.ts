import { IOrderProduct, OrderStatus } from "@setel/data-model";
import { Document } from "mongoose";

export interface IOrderDocument extends Document {
  order_products: IOrderProduct[];
  user_id: string;
  status: OrderStatus;
  created_at: number;
}
