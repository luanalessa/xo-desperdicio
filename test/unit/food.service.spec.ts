// src/application/services/food.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodService } from '@services/food.services';
import { Food } from '@domain/models/food.model';
import { CreateFoodDto } from '@dto/food.dto';
import { FoodStatus } from '@domain/enums/food.status';

describe('FoodService', () => {
  let foodService: FoodService;
  let foodRepository: Repository<Food>;

  const mockFoodRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: getRepositoryToken(Food),
          useValue: mockFoodRepository,
        },
      ],
    }).compile();

    foodService = module.get<FoodService>(FoodService);
    foodRepository = module.get<Repository<Food>>(getRepositoryToken(Food));
  });

  describe('createFood', () => {
    it('should successfully create a food item', async () => {
      const createFoodDto: CreateFoodDto = {
        foodType: 'Fruits',
        expirationDate: new Date('2024-12-31'),
        weight: 1.5,
        quantity: 10,
        donorId: 'abc123',
        status: FoodStatus.AVAILABLE,
      };

      const savedFood: Food = {
        id: '1', // Simulando um ID gerado
        ...createFoodDto,
      };

      mockFoodRepository.create.mockReturnValue(savedFood);
      mockFoodRepository.save.mockResolvedValue(savedFood);

      const result = await foodService.createFood(createFoodDto);

      expect(result).toEqual(savedFood);
      expect(mockFoodRepository.create).toHaveBeenCalledWith(createFoodDto);
      expect(mockFoodRepository.save).toHaveBeenCalledWith(savedFood);
    });

    it('should throw an error if food item creation fails', async () => {
      const createFoodDto: CreateFoodDto = {
        foodType: 'Fruits',
        expirationDate: new Date('2024-12-31'),
        weight: 1.5,
        quantity: 10,
        donorId: 'abc123',
        status: FoodStatus.AVAILABLE,
      };

      mockFoodRepository.create.mockReturnValue(createFoodDto);
      mockFoodRepository.save.mockRejectedValue(new Error('Failed to save food item'));

      await expect(foodService.createFood(createFoodDto)).rejects.toThrow('Failed to save food item');
    });
  });

  describe('getAllFoods', () => {
    it('should return an array of food items', async () => {
      const foodItems: Food[] = [
        {
          id: '1',
          foodType: 'Fruits',
          expirationDate: new Date('2024-12-31'),
          weight: 1.5,
          quantity: 10,
          donorId: 'abc123',
          status: FoodStatus.AVAILABLE,
        },
        {
          id: '2',
          foodType: 'Vegetables',
          expirationDate: new Date('2024-11-30'),
          weight: 2.0,
          quantity: 5,
          donorId: 'def456',
          status: FoodStatus.EXPIRED,
        },
      ];

      mockFoodRepository.find.mockResolvedValue(foodItems);

      const result = await foodService.getAllFoods();

      expect(result).toEqual(foodItems);
      expect(mockFoodRepository.find).toHaveBeenCalled();
    });
  });

  describe('getFoodById', () => {
    it('should return a food item by id', async () => {
      const foodItem: Food = {
        id: '1',
        foodType: 'Fruits',
        expirationDate: new Date('2024-12-31'),
        weight: 1.5,
        quantity: 10,
        donorId: 'abc123',
        status: FoodStatus.AVAILABLE,
      };

      mockFoodRepository.findOne.mockResolvedValue(foodItem);

      const result = await foodService.getFoodById('1');

      expect(result).toEqual(foodItem);
      expect(mockFoodRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return null if no food item is found', async () => {
      mockFoodRepository.findOne.mockResolvedValue(null);

      const result = await foodService.getFoodById('non-existent-id');

      expect(result).toBeNull();
      expect(mockFoodRepository.findOne).toHaveBeenCalledWith({ where: { id: 'non-existent-id' } });
    });
  });
});
