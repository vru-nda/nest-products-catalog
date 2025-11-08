import { IsNotEmpty, IsPositive, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}
