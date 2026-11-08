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
