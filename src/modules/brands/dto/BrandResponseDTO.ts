import { Brand } from '../../../orm/entities/brands/Brand';

export class BrandResponseDTO {
  id: number;
  brandName: string; // Переименовано для API
  country: string;

  constructor(brand: Brand) {
    this.id = brand.id;
    this.brandName = brand.name;
    this.country = brand.country;
  }
}
