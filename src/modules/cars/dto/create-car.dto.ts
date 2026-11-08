import { IsString, IsNotEmpty, IsNumber, IsEnum, IsInt, MaxLength, Min, Max } from 'class-validator';

enum CarStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold',
}

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  model!: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  year!: number;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(17)
  vin!: string;

  @IsEnum(CarStatus)
  status?: CarStatus;

  @IsInt()
  @IsNotEmpty()
  brandId!: number;
}
