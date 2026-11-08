import { getRepository } from 'typeorm';
import { Brand } from '../../orm/entities/brands/Brand';
import { CreateBrandDto } from './dto/create-brand.dto';

export class BrandService {
  private brandRepository = getRepository(Brand);

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(brand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand | undefined> {
    return await this.brandRepository.findOne(id, { relations: ['cars'] });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.brandRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async update(id: number, updateData: Partial<CreateBrandDto>): Promise<Brand | undefined> {
    await this.brandRepository.update(id, updateData);
    return await this.findOne(id);
  }
}
