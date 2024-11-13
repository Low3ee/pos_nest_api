import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Import Prisma service
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { Product, Category } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        category: createProductDto.category,
        imageUrl: createProductDto.imageUrl,
      },
    });
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  // Get a product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // Update a product by ID
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name ?? product.name,
        description: updateProductDto.description ?? product.description,
        price: updateProductDto.price ?? product.price,
        category: updateProductDto.category ?? product.category,
        imageUrl: updateProductDto.imageUrl ?? product.imageUrl,
      },
    });
  }

  // Delete a product by ID
  async remove(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
