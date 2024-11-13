// create-product.dto.ts
import { IsString, IsNumber, IsOptional, IsEnum, IsUrl } from 'class-validator';
import { Category } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price!: number;

  @IsEnum(Category)
  category!: Category;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
