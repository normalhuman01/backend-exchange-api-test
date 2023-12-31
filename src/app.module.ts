import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './infraestructure/redis/redis.module';
import { UsersModule } from './users/users.module';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), UsersModule, AuthModule, RedisModule, ExchangeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
