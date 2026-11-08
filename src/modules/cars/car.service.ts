import { getRepository } from 'typeorm';
import { Car } from '../../orm/entities/cars/Car';
import { Brand } from '../../orm/entities/brands/Brand';
import { CreateCarDto } from './dto/create-car.dto';

export class CarService {
  private carRepository = getRepository(Car);
  private brandRepository = getRepository(Brand);

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const brand = await this.brandRepository.findOne(createCarDto.brandId);
    if (!brand) {
      throw new Error(`Brand with ID ${createCarDto.brandId} not found`);
    }

    const car = this.carRepository.create({
      ...createCarDto,
      brand,
    });

    return await this.carRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find({ relations: ['brand'] });
  }

  async findOne(id: number): Promise<Car | undefined> {
    return await this.carRepository.findOne(id, { relations: ['brand'] });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.carRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async update(id: number, updateData: any): Promise<Car | undefined> {
    if (updateData.brandId) {
      const brand = await this.brandRepository.findOne(updateData.brandId);
      if (!brand) {
        throw new Error(`Brand with ID ${updateData.brandId} not found`);
      }
      updateData.brand = brand;
    }

    await this.carRepository.update(id, updateData);
    return await this.findOne(id);
  }
}
