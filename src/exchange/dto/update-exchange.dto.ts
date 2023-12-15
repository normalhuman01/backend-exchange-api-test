import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateExchangeDto {
    @IsNotEmpty()
    @IsNumber()
    rate: number;
}
  