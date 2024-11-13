// update-product.dto.ts
import { IsString, IsNumber, IsOptional, IsEnum, IsUrl } from 'class-validator';
import { Category } from '@prisma/client';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsEnum(Category)
  @IsOptional()
  category?: Category;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
