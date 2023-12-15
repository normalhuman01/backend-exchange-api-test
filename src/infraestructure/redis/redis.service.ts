import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {   

    this.redisClient = new Redis({
        host: String(process.env.REDIS_HOST), 
        port: Number(process.env.REDIS_PORT),  
        password: String(process.env.REDIS_PWD)    
      });
  }

  async getUser(email: string): Promise<string | null> {
    return await this.redisClient.get(`user:${email}`);
  }

  async setUser(email: string, user: any): Promise<void> {
    await this.redisClient.set(`user:${email}`, JSON.stringify(user));
  }

  async getUserPassword(email: string): Promise<string | null> {
    let foundUser = await this.redisClient.get(`user:${email}`); 

    return foundUser ? JSON.parse(foundUser).password : null;
  }

  async setUserPassword(email: string, password: string): Promise<void> {
    await this.redisClient.set(`user:${email}:password`, password);
  }
}
