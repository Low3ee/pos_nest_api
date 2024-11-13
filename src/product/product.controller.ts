import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ProductsService } from './product.service';
  import { CreateProductDto } from './dto/create_product.dto';
  import { UpdateProductDto } from './dto/update_product.dto';
  import { Product } from '@prisma/client';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    // Create a new product
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
      return this.productsService.create(createProductDto);
    }
  
    // Get all products
    @Get()
    async findAll(): Promise<Product[]> {
      return this.productsService.findAll();
    }
  
    // Get a single product by ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
      return this.productsService.findOne(id);
    }
  
    // Update a product by ID
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
      return this.productsService.update(id, updateProductDto);
    }
  
    // Delete a product by ID
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<Product> {
      return this.productsService.remove(id);
    }
  }
  