import { IsNumber, IsString, IsNotEmpty, Length } from 'class-validator';

export class RequestExchangeDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3, { message: 'La moneda origen debe tener tres caracteres, Ejem: USD, PEN, EUR' })
  from: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3, { message: 'La moneda a convertir debe tener tres caracteres. Ejem: USD, PEN, EUR' })
  to: string;
}
