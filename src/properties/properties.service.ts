import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';

// servicio para la gestión de propiedades
@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  // crea una propiedad en la base de datos
  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  // obtiene el listado completo de propiedades
  async findAll(): Promise<Property[]> {
    return await this.propertyRepository.find();
  }

  // obtiene una propiedad por su identificador
  async findOne(id: string): Promise<Property> {
    return await this.propertyRepository.findOneOrFail({ where: { id } });
  }

  // busca propiedades aplicando filtros específicos
  async search(params: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    latitude?: number;
    longitude?: number;
    radius?: number;
  }): Promise<Property[]> {
    const query = this.propertyRepository.createQueryBuilder('property');

    // aplica filtro por tipo de propiedad
    if (params.type) {
      query.andWhere('property.type = :type', { type: params.type });
    }

    // aplica filtro por rango de precios
    if (params.minPrice || params.maxPrice) {
      query.andWhere('property.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: params.minPrice || 0,
        maxPrice: params.maxPrice || Number.MAX_SAFE_INTEGER,
      });
    }

    // aplica filtro por rango de área
    if (params.minArea || params.maxArea) {
      query.andWhere('property.area BETWEEN :minArea AND :maxArea', {
        minArea: params.minArea || 0,
        maxArea: params.maxArea || Number.MAX_SAFE_INTEGER,
      });
    }

    // aplica filtro por ubicación geográfica
    if (params.latitude && params.longitude && params.radius) {
      // aplica fórmula de haversine para el cálculo de distancias
      query.andWhere(
        `(
          6371 * acos(
            cos(radians(:latitude)) * cos(radians(property.latitude)) *
            cos(radians(property.longitude) - radians(:longitude)) +
            sin(radians(:latitude)) * sin(radians(property.latitude))
          )
        ) <= :radius`,
        {
          latitude: params.latitude,
          longitude: params.longitude,
          radius: params.radius,
        },
      );
    }

    return await query.getMany();
  }

  // actualiza la información de una propiedad
  async update(id: string, updatePropertyDto: Partial<CreatePropertyDto>): Promise<Property> {
    await this.propertyRepository.update(id, updatePropertyDto);
    return await this.findOne(id);
  }

  // elimina una propiedad del sistema
  async remove(id: string): Promise<void> {
    await this.propertyRepository.delete(id);
  }
}