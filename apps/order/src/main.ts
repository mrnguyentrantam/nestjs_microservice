import { NestFactory } from "@nestjs/core";
import { Transport, TcpOptions } from "@nestjs/microservices";
import { OrderModule } from "./app/order.module";

import { ConfigService } from "./app/config/config.service";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: new ConfigService().get("port"),
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
