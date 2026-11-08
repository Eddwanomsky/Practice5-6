# REST API Backend (Express, TypeScript, TypeORM, PostgreSQL)

Проєкт реалізує повноцінний REST API бекенд із дотриманням сучасних архітектурних принципів, впровадженням сервісного шару, валідацією вхідних даних через middleware та контрольованими відповідями за допомогою DTO.

---

##Архітектура проекту та ролі шарів

Проєкт побудований за багатошаровою (Layered) архітектурою, де кожен шар виконує строго визначену задачу:

1. **Middleware (Валідація):**
   * Перевіряє вхідні дані (`req.body`) до того, як вони потраплять у контролер. Використовує бібліотеку `validator` для перевірки полів та генерує контрольовані помилки через клас `AppError` (статус 400 Bad Request).
2. **Controller (Оркестрація):**
   * Приймає HTTP-запити, викликає методи сервісного шару, керує HTTP-статусами відповіді та трансформує отримані дані в Response DTO.
3. **Service (Бізнес-логіка):**
   * Містить всю основну бізнес-логіку програми. Інкапсулює взаємодію з репозиторіями TypeORM, обробку зв'язків та перевірки наявності сутностей у базі даних.
4. **Repository / Entity (Доступ до даних):**
   * Описують структуру таблиць бази даних (`Brand`, `Car`) та забезпечують пряму роботу з PostgreSQL через TypeORM.

---

##Приклади реалізації ключових компонентів

### 1. Middleware-функція для валідації
Приклад асинхронного валідатора для створення автомобіля:

```typescript
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { AppError } from '../../../errors/AppError';

export async function validatorCreateCar(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const { model, year, price, vin, brandId } = req.body;

  if (validator.isEmpty(model || '')) {
    throw new AppError('Car model is required');
  }
  if (!year || !validator.isInt(String(year), { min: 1900, max: 2100 })) {
    throw new AppError('Valid year between 1900 and 2100 is required');
  }
  if (!price || !validator.isFloat(String(price), { gt: 0 })) {
    throw new AppError('Price must be a number greater than 0');
  }
  if (validator.isEmpty(vin || '')) {
    throw new AppError('VIN code is required');
  }
  if (!brandId || !validator.isInt(String(brandId))) {
    throw new AppError('Valid brandId is required');
  }

  return next();
}

Приклад роботи CarService

import { AppDataSource } from '../../database/data-source';
import { Car } from '../../orm/entities/Car';
import { Brand } from '../../orm/entities/Brand';

export class CarService {
  private carRepository = AppDataSource.getRepository(Car);
  private brandRepository = AppDataSource.getRepository(Brand);

  async create(carData: any): Promise<Car> {
    const brand = await this.brandRepository.findOne({ where: { id: carData.brandId } });
    if (!brand) {
      throw new Error(`Brand with ID ${carData.brandId} not found`);
    }

    const car = this.carRepository.create({
      ...carData,
      brand,
    });
    return await this.carRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find({ relations: ['brand'] });
  }
}

Клас для фільтрації та безпечного формування відповіді клієнту

import { Car } from '../../../orm/entities/Car';

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
      this.brandName = car.brand.name;
    }
  }
}

Помилка валідації (400 Bad Request)
Запит на створення сутності з порожніми чи некоректними даними перехоплюється middleware-валідатором і повертає помилку
<img width="755" height="591" alt="image" src="https://github.com/user-attachments/assets/a3c0bcb6-be14-4401-a98f-6d8916e7c9bd" />

Успішний запит повертає відфільтровану структуровану відповідь через DTO
<img width="545" height="690" alt="image" src="https://github.com/user-attachments/assets/67ac1a26-afbd-49d4-9cf1-348f5cb170f4" />



