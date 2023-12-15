import { AuthModule } from "src/auth/auth.module";
import { ExchangeController } from "./exchange.controller";
import { ExchangeService } from "./exchange.service";
import { Module } from '@nestjs/common';

@Module({
    imports: [AuthModule],
    providers: [ExchangeService],
    exports: [ExchangeService],
    controllers: [ExchangeController]
})
export class ExchangeModule {}
