import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RequestExchangeDto } from './dto/request-exchange.dto';


@Injectable()
export class ExchangeService implements OnModuleInit {
    private readonly redisClient: Redis;

    constructor() {
      this.redisClient = new Redis({
        host: 'redis-11353.c322.us-east-1-2.ec2.cloud.redislabs.com', 
        port: 11353,  
        password: 'a6LyQ9MxNzQUKP53cZkvyOidSS7ktydj'    
      });
    }

  async onModuleInit() {
        // Verificar si la base de datos está vacía antes de añadir valores iniciales
        const keys = await this.redisClient.keys('*');
        if (keys.length === 0) {
          await this.setExchangeRate("EUR", 1);
          await this.setExchangeRate("USD", 1.098913);
          await this.setExchangeRate("PEN", 4.137395);
        }
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
    const rateFrom = await this.redisClient.get(`${fromCurrency}`); 
    console.log(rateFrom)
    const rateTo = await this.redisClient.get(`${toCurrency}`);
    return rateFrom &&  rateTo ? parseFloat(rateTo)/parseFloat(rateFrom) : null;
  }

  async setExchangeRate(currency: string, rate: number): Promise<void> {
    const key = `${currency}`;
    await this.redisClient.set(key, rate.toString());
  }

  async calculateExchange(dto: RequestExchangeDto): Promise<any> { 

    
    const fromCurrency = dto.from;
    const toCurrency = dto.to;
    const amount = dto.amount; 


    const rate = await this.getExchangeRate(fromCurrency, toCurrency);

    if (rate === null) {
      throw new Error(`Tipo de cambio no disponible para ${fromCurrency} a ${toCurrency}`);
    }

    const resultAmount = amount * rate;

    return {
      original_amount: amount,
      result_amount: resultAmount.toFixed(4),
      from: fromCurrency,
      to: toCurrency,
      rate: rate.toFixed(4),
    };
  }
}
