import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/infraestructure/redis/redis.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly redisService: RedisService) {}

  async findByEmail(email: string): Promise<any> {
    const user = await this.redisService.getUser(email);

    return user ? JSON.parse(user) : null;
  }

  async registerUser(email: string, password: string): Promise<void> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new Error('El usuario ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.redisService.setUser(email, { email, password: hashedPassword });
  }
}
