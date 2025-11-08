import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async findAll() {
    const products = await this.repo.find();
    return {
      success: true,
      data: products,
      message: products.length
        ? 'Products fetched successfully'
        : 'No products found',
    };
  }

  async create(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    const saved = await this.repo.save(product);
    return {
      success: true,
      data: saved,
      message: 'Product created successfully',
    };
  }

  async delete(id: string) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException({
        success: false,
        message: `Product with id ${id} not found`,
      });
    }
    await this.repo.remove(product);
    return {
      success: true,
      data: { id },
      message: 'Product deleted successfully',
    };
  }
}
