import { Body, Controller, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RequestExchangeDto } from './dto/request-exchange.dto';
import { ExchangeService } from './exchange.service';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('exchange')
export class ExchangeController {

    constructor(private readonly exchangeService: ExchangeService) {}

    @Post('calculate')
    @UseGuards(AuthGuard)
    async calculateExchange(@Body() dto: RequestExchangeDto): Promise<any> {
      try {
        const result = await this.exchangeService.calculateExchange(dto);
        return result;
      } catch (error) {
        return { error: error.message };
      }
    }


    @Put(':currency/update')
    async updateExchangeRate(@Param() params: any, @Body() dto: UpdateExchangeDto, @Res() res: Response) {
        try {
        const { rate } = dto;
        await this.exchangeService.setExchangeRate( params.currency, rate);
        res.send({ message: `Tipo de cambio actualizado` });
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    }



}
