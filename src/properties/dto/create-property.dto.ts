import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsLatitude, IsLongitude, Min, IsUrl, Max, MinLength, MaxLength, IsIn, ArrayMaxSize } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ description: 'nombre de la propiedad' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'descripción de la propiedad' })
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description: string;

  @ApiProperty({ description: 'tipo de propiedad' })
  @IsString()
  @IsIn(['house', 'apartment', 'commercial', 'land', 'office'])
  type: string;

  @ApiProperty({ description: 'precio de la propiedad' })
  @IsNumber()
  @Min(0)
  @Max(1000000000) // 1 billion maximum
  price: number;

  @ApiProperty({ description: 'área total en metros cuadrados' })
  @IsNumber()
  @Min(1)
  @Max(100000) // 100,000 m² maximum
  area: number;

  @ApiProperty({ description: 'latitud de la propiedad' })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'longitud de la propiedad' })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ description: 'dirección de la propiedad' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'url de la imagen principal' })
  @IsUrl()
  mainImageUrl: string;

  @ApiProperty({ description: 'urls de imágenes adicionales' })
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(20) // máximo de imágenes permitidas
  imageUrls: string[];

  @ApiProperty({ description: 'número de habitaciones' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(20) // máximo razonable de habitaciones
  bedrooms?: number;

  @ApiProperty({ description: 'número de baños' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(15) // máximo razonable de baños
  bathrooms?: number;

  @ApiProperty({ description: 'número de espacios de estacionamiento' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(50) // máximo razonable de espacios de estacionamiento
  parkingSpaces?: number;
}