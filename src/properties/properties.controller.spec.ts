import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let service: PropertiesService;

  const mockPropertiesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        {
          provide: PropertiesService,
          useValue: mockPropertiesService,
        },
      ],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
    service = module.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated properties', async () => {
      const result = {
        items: [{ id: '1', name: 'Property 1' }],
        total: 1,
      };
      mockPropertiesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll(1, 10)).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('search', () => {
    it('should search properties with filters', async () => {
      const searchParams = {
        type: 'house',
        minPrice: 100000,
        maxPrice: 200000,
      };
      const result = [{ id: '1', name: 'House 1' }];
      mockPropertiesService.search.mockResolvedValue(result);

      expect(await controller.search(
        searchParams.type,
        searchParams.minPrice,
        searchParams.maxPrice,
      )).toBe(result);
    });
  });
}); 