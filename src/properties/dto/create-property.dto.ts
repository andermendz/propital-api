import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsLatitude, IsLongitude, Min, IsUrl } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ description: 'Name of the property' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the property' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Type of the property (e.g., house, apartment, commercial)' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Price of the property' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Total area of the property in square meters' })
  @IsNumber()
  @Min(0)
  area: number;

  @ApiProperty({ description: 'Latitude coordinate of the property' })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'Longitude coordinate of the property' })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ description: 'Address of the property' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Main image URL of the property' })
  @IsUrl()
  mainImageUrl: string;

  @ApiProperty({ description: 'Additional images URLs of the property' })
  @IsArray()
  @IsUrl({}, { each: true })
  imageUrls: string[];

  @ApiProperty({ description: 'Number of bedrooms', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bedrooms?: number;

  @ApiProperty({ description: 'Number of bathrooms', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bathrooms?: number;

  @ApiProperty({ description: 'Number of parking spaces', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  parkingSpaces?: number;
}