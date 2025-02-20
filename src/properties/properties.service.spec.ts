import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';

describe('PropertiesService', () => {
  let service: PropertiesService;
  
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    findAndCount: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockImplementation(() => Promise.resolve([
        { id: '1', name: 'House 1', type: 'house', price: 150000, area: 150 }
      ])),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        name: 'Test Property',
        description: 'Test Description',
        type: 'house',
        price: 100000,
        area: 150,
        latitude: 40.7128,
        longitude: -74.0060,
        address: 'Test Address',
        mainImageUrl: 'http://test.com/image.jpg',
        imageUrls: ['http://test.com/image1.jpg'],
      };

      const expectedProperty = { id: '1', ...createPropertyDto };
      mockRepository.create.mockReturnValue(expectedProperty);
      mockRepository.save.mockResolvedValue(expectedProperty);

      const result = await service.create(createPropertyDto);
      expect(result).toEqual(expectedProperty);
    });
  });

  describe('findAll', () => {
    it('should return paginated properties', async () => {
      const properties = [
        { id: '1', name: 'Property 1' },
        { id: '2', name: 'Property 2' },
      ];
      mockRepository.findAndCount.mockResolvedValue([properties, 2]);

      const result = await service.findAll(1, 10);
      expect(result).toEqual({ items: properties, total: 2 });
    });
  });

  describe('search', () => {
    it('should search properties with filters', async () => {
      const searchParams = {
        type: 'house',
        minPrice: 100000,
        maxPrice: 200000,
        minArea: 100,
        maxArea: 200,
      };

      const expectedProperties = [
        { id: '1', name: 'House 1', type: 'house', price: 150000, area: 150 },
      ];

      const result = await service.search(searchParams);
      
      // Verify that query builder methods were called
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      const queryBuilder = mockRepository.createQueryBuilder();
      expect(queryBuilder.andWhere).toHaveBeenCalledTimes(3); // type, price range, and area range
      expect(queryBuilder.getMany).toHaveBeenCalled();
      
      // Verify the final result
      expect(result).toEqual(expectedProperties);
    });
  });
}); 