import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { RedisModule } from 'src/infraestructure/redis/redis.module';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret:  'S3CR3TK3Y',
            signOptions: { expiresIn: '1h' },
          }),
          UsersModule,
          RedisModule,
    ],
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController],
  })
  export class AuthModule {}
