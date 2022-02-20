import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [AppService],
})
export class AppModule {}
