import { Request, Response } from 'express';
import { BrandService } from './brand.service';
import { BrandResponseDTO } from './dto/BrandResponseDTO';

export class BrandController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const brandService = new BrandService();
      const brand = await brandService.create(req.body);
      return res.status(201).json(new BrandResponseDTO(brand)); // Оборачиваем в DTO
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const brandService = new BrandService();
      const brands = await brandService.findAll();
      return res.json(brands.map((brand) => new BrandResponseDTO(brand))); // Маппим массив в DTO
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const brandService = new BrandService();
      const brand = await brandService.findOne(Number(req.params.id));
      if (!brand) {
        return res.status(404).json({ message: 'Brand not found' });
      }
      return res.json(new BrandResponseDTO(brand)); // Оборачиваем в DTO
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const brandService = new BrandService();
      const success = await brandService.delete(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: 'Brand not found' });
      }
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const brandService = new BrandService();
      const updatedBrand = await brandService.update(Number(req.params.id), req.body);
      if (!updatedBrand) {
        return res.status(404).json({ message: 'Brand not found' });
      }
      return res.json(new BrandResponseDTO(updatedBrand)); // Оборачиваем в DTO
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
