import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/infraestructure/redis/redis.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const hashedPassword = await this.redisService.getUserPassword(email);

    if (hashedPassword && (await bcrypt.compare(password, hashedPassword))) {
      const user = await this.usersService.findByEmail(email);
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserById(userId: string): Promise<any> {
    const user = await this.usersService.findByEmail(userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.emai, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
