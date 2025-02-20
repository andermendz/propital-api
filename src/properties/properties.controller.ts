import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './entities/property.entity';

// controlador para manejar todo lo relacionado con las propiedades
@ApiTags('properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({ summary: 'crea una nueva propiedad en el sistema' })
  @ApiResponse({ status: 201, description: 'propiedad creada exitosamente', type: Property })
  create(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'obtiene todas las propiedades disponibles' })
  @ApiResponse({ status: 200, description: 'lista de todas las propiedades', type: [Property] })
  findAll(): Promise<Property[]> {
    return this.propertiesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'busca propiedades usando diferentes filtros' })
  @ApiResponse({ status: 200, description: 'lista de propiedades filtradas', type: [Property] })
  @ApiQuery({ name: 'type', required: false, description: 'tipo de propiedad que buscas' })
  @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'precio mínimo' })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'precio máximo' })
  @ApiQuery({ name: 'minArea', required: false, type: Number, description: 'área mínima' })
  @ApiQuery({ name: 'maxArea', required: false, type: Number, description: 'área máxima' })
  @ApiQuery({ name: 'latitude', required: false, type: Number, description: 'latitud para búsqueda por ubicación' })
  @ApiQuery({ name: 'longitude', required: false, type: Number, description: 'longitud para búsqueda por ubicación' })
  @ApiQuery({ name: 'radius', required: false, type: Number, description: 'radio de búsqueda en kilómetros' })
  search(
    @Query('type') type?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('minArea') minArea?: number,
    @Query('maxArea') maxArea?: number,
    @Query('latitude') latitude?: number,
    @Query('longitude') longitude?: number,
    @Query('radius') radius?: number,
  ): Promise<Property[]> {
    return this.propertiesService.search({
      type,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      latitude,
      longitude,
      radius,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'encuentra una propiedad específica por su id' })
  @ApiResponse({ status: 200, description: 'propiedad encontrada', type: Property })
  findOne(@Param('id') id: string): Promise<Property> {
    return this.propertiesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'actualiza los datos de una propiedad' })
  @ApiResponse({ status: 200, description: 'propiedad actualizada correctamente', type: Property })
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: Partial<CreatePropertyDto>,
  ): Promise<Property> {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'elimina una propiedad del sistema' })
  @ApiResponse({ status: 200, description: 'propiedad eliminada correctamente' })
  remove(@Param('id') id: string): Promise<void> {
    return this.propertiesService.remove(id);
  }
}