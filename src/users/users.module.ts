import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RedisModule } from 'src/infraestructure/redis/redis.module';

@Module({
    imports: [RedisModule],
    providers: [UsersService],
    exports: [UsersService],
  })
export class UsersModule {}
