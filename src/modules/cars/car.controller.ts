import { Request, Response } from 'express';
import { CarService } from './car.service';
import { CarResponseDTO } from './dto/CarResponseDTO';

export class CarController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const carService = new CarService();
      const car = await carService.create(req.body);
      return res.status(201).json(new CarResponseDTO(car)); // Оборачиваем в DTO
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const carService = new CarService();
      const cars = await carService.findAll();
      return res.json(cars.map((car) => new CarResponseDTO(car))); // Маппим массив в DTO
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const carService = new CarService();
      const car = await carService.findOne(Number(req.params.id));
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      return res.json(new CarResponseDTO(car)); // Оборачиваем в DTO
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const carService = new CarService();
      const success = await carService.delete(Number(req.params.id));
      if (!success) {
        return res.status(404).json({ message: 'Car not found' });
      }
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const carService = new CarService();
      const updatedCar = await carService.update(Number(req.params.id), req.body);
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
      return res.json(new CarResponseDTO(updatedCar)); // Оборачиваем в DTO
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
