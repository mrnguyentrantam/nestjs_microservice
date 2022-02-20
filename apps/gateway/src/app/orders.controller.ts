import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
import {
  CreateOrderDto,
  CreateOrderResponseDto,
  IAuthorizedRequest,
  OrdersResponseDto,
} from "@setel/data-model";

import { Authorization } from "../decorators/authorization.decorator";

@Controller("orders")
export class OrdersController {
  constructor(
    @Inject("ORDER_SERVICE") private readonly orderServiceClient: ClientProxy
  ) {}

  @Get()
  @Authorization(true)
  public async getOrders(
    @Req() request: IAuthorizedRequest
  ): Promise<OrdersResponseDto> {
    const { userId } = request;

    const orderResponse = await firstValueFrom(
      this.orderServiceClient.send("orders", userId)
    );

    return {
      message: orderResponse.message,
      data: orderResponse.orders,
      status: HttpStatus.OK,
    };
  }

  @Post()
  @Authorization(true)
  public async createOrder(
    @Req() request: IAuthorizedRequest,
    @Body() orderRequest: CreateOrderDto
  ): Promise<CreateOrderResponseDto> {
    const { userId } = request;
    const createOrderResponse = await firstValueFrom(
      this.orderServiceClient.send(
        "order_create",
        Object.assign(orderRequest, { userId })
      )
    );

    if (createOrderResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createOrderResponse.message,
          data: null,
          errors: createOrderResponse.errors,
        },
        createOrderResponse.status
      );
    }

    return {
      message: createOrderResponse.message,
      data: createOrderResponse.order,
      errors: null,
    };
  }
}
