import { IOrderDocument } from "./order.interface";

export interface IOrderUpdateByIdResponse {
  status: number;
  message: string;
  order: IOrderDocument | null;
  errors: { [key: string]: any } | null;
}
