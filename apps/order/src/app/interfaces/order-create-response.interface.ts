import { IOrderDocument } from "./order.interface";

export interface IOrderCreateResponse {
  status: number;
  message: string;
  order: IOrderDocument | null;
  errors: { [key: string]: any } | null;
}
