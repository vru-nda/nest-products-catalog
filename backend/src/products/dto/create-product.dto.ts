import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}
