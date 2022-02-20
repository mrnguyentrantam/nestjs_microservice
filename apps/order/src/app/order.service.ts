import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { OrderStatus } from "@setel/data-model";
import { Model } from "mongoose";
import { IOrderDocument } from "./interfaces/order.interface";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel("Order") private readonly orderModel: Model<IOrderDocument>
  ) {}

  public async getOrdersByUserId(userId: string): Promise<IOrderDocument[]> {
    return this.orderModel.find({ userId }).exec();
  }

  public async findOrderById(id: string) {
    return await this.orderModel.findById(id);
  }

  public async createOrder(orderBody: IOrderDocument): Promise<IOrderDocument> {
    const orderModel = new this.orderModel(orderBody);
    return await orderModel.save();
  }

  public async updateOrderStatusById(
    id: string,
    status: OrderStatus
  ): Promise<IOrderDocument> {
    return await this.orderModel.findByIdAndUpdate(id, { status });
  }
}
