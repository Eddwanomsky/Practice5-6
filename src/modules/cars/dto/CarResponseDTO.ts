import { Car } from '../../../orm/entities/cars/Car';

export class CarResponseDTO {
  id: number;
  model: string;
  year: number;
  price: number;
  vin: string;
  brandName?: string;

  constructor(car: Car) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.price = car.price;
    this.vin = car.vin;
    if (car.brand) {
      this.brandName = car.brand.name; // Вытягиваем название бренда из связи
    }
  }
}
