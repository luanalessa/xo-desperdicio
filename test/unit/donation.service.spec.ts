import { Test, TestingModule } from '@nestjs/testing';
import { DonationService } from '@services/donation.services';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DonationOrder } from '@domain/models/donation.order.model';
import { Food } from '@domain/models/food.model';
import { CreateDonationOrderDto } from '@dto/donation.order.dto';
import { UpdateDonationStatusDto } from '@dto/update.donation.status.dto';
import { DonationStatus } from 'src/application/enums/donation.status';

const mockDonationOrderRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  count: jest.fn(),
};

const mockFoodRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('DonationService', () => {
  let service: DonationService;
  let donationOrderRepository: typeof mockDonationOrderRepository;
  let foodRepository: typeof mockFoodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationService,
        {
          provide: getRepositoryToken(DonationOrder),
          useValue: mockDonationOrderRepository,
        },
        {
          provide: getRepositoryToken(Food),
          useValue: mockFoodRepository,
        },
      ],
    }).compile();

    service = module.get<DonationService>(DonationService);
    donationOrderRepository = module.get(getRepositoryToken(DonationOrder));
    foodRepository = module.get(getRepositoryToken(Food));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDonationOrders', () => {
    it('should return an array of donation orders', async () => {
      const mockOrders = [
        new DonationOrder(5, 'requester1', 'food1'),
        new DonationOrder(10, 'requester2', 'food2'),
      ];
      donationOrderRepository.find.mockResolvedValue(mockOrders);

      const result = await service.getDonationOrders();
      expect(result).toEqual(mockOrders);
      expect(donationOrderRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDonationOrderById', () => {
    it('should return a donation order if it exists', async () => {
      const mockOrder = new DonationOrder(5, 'requester1', 'food1');
      donationOrderRepository.findOne.mockResolvedValue(mockOrder);

      const result = await service.getDonationOrderById('someId');
      expect(result).toEqual(mockOrder);
      expect(donationOrderRepository.findOne).toHaveBeenCalledWith({ where: { id: 'someId' } });
    });

    it('should throw an error if donation order is not found', async () => {
      donationOrderRepository.findOne.mockResolvedValue(null);

      await expect(service.getDonationOrderById('someId')).rejects.toThrow('Donation order not found');
    });
  });

  describe('createDonationOrder', () => {
    it('should create and save a donation order', async () => {
      const mockFood = { id: 'food1', quantity: 10 } as Food;
      const mockOrder = new DonationOrder(5, 'user1', 'food1');
      const createOrderDto: CreateDonationOrderDto = { foodId: 'food1', quantity: 5, requesterId: 'user1' };

      foodRepository.findOne.mockResolvedValue(mockFood);
      donationOrderRepository.save.mockResolvedValue(mockOrder);

      const result = await service.createDonationOrder(createOrderDto);
      expect(result).toEqual(mockOrder);
      expect(foodRepository.findOne).toHaveBeenCalledWith({ where: { id: 'food1' } });
      expect(donationOrderRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if food item is not found', async () => {
      foodRepository.findOne.mockResolvedValue(null);

      const createOrderDto: CreateDonationOrderDto = { foodId: 'food1', quantity: 5, requesterId: 'user1' };
      await expect(service.createDonationOrder(createOrderDto)).rejects.toThrow('Food item not found');
    });

    it('should throw an error if insufficient food quantity', async () => {
      const mockFood = { id: 'food1', quantity: 2 } as Food;
      foodRepository.findOne.mockResolvedValue(mockFood);

      const createOrderDto: CreateDonationOrderDto = { foodId: 'food1', quantity: 5, requesterId: 'user1' };
      await expect(service.createDonationOrder(createOrderDto)).rejects.toThrow('Insufficient quantity available');
    });
  });

  describe('updateDonationStatus', () => {
    it('should update the donation status', async () => {
      const mockOrder = new DonationOrder(5, 'user1', 'food1');
      const updateStatusDto: UpdateDonationStatusDto = { donationOrderId: 'order1', status: DonationStatus.COMPLETED };

      donationOrderRepository.findOne.mockResolvedValue(mockOrder);
      donationOrderRepository.save.mockResolvedValue(mockOrder);

      const result = await service.updateDonationStatus(updateStatusDto);
      expect(result).toEqual(mockOrder);
      expect(donationOrderRepository.findOne).toHaveBeenCalledWith({ where: { id: 'order1' } });
      expect(donationOrderRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if donation order is not found', async () => {
      donationOrderRepository.findOne.mockResolvedValue(null);

      const updateStatusDto: UpdateDonationStatusDto = { donationOrderId: 'order1', status: DonationStatus.CANCELLED };
      await expect(service.updateDonationStatus(updateStatusDto)).rejects.toThrow('Donation order not found');
    });
  });
});
