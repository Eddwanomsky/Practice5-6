import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { AppError } from '../../../errors/AppError';

export async function validatorCreateBrand(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const { name, country } = req.body;

  if (validator.isEmpty(name || '')) {
    throw new AppError('Brand name is required');
  }
  if (validator.isEmpty(country || '')) {
    throw new AppError('Country is required');
  }

  return next();
}
