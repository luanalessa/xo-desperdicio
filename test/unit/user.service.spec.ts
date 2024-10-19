import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '@services/user.services';
import { User } from '@domain/models/user.model';
import { CreateUserDto } from '@dto/user.dto';
import { UserType } from '@domain/enums/user.type';
import { CreateAddressDto } from '@dto/address.dto'; // Importa o CreateAddressDto

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('registerUser', () => {
    it('should successfully register a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        phone: '+1 555-555-5555',
        email: 'user@example.com',
        password: 'strongPassword123',
        address: {
          street: '123 Main St',
          number: '456', // Corrigido para usar 'number' conforme CreateAddressDto
          city: 'Anytown',
          neighborhood: 'Downtown',
          postalCode: '12345', // Corrigido para usar 'postalCode' conforme CreateAddressDto
          state: 'CA',
        },
        type: UserType.NORMAL,
      };

      const savedUser: User = {
        id: '1', // Simulando um ID gerado
        ...createUserDto,
      };

      mockUserRepository.create.mockReturnValue(savedUser);
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await userService.registerUser(createUserDto);

      expect(result).toEqual(savedUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(savedUser);
    });

    it('should throw an error if user registration fails', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        phone: '+1 555-555-5555',
        email: 'user@example.com',
        password: 'strongPassword123',
        address: {
          street: '123 Main St',
          number: '456', // Corrigido para usar 'number' conforme CreateAddressDto
          city: 'Anytown',
          neighborhood: 'Downtown',
          postalCode: '12345', // Corrigido para usar 'postalCode' conforme CreateAddressDto
          state: 'CA',
        },
        type: UserType.NORMAL,
      };

      mockUserRepository.create.mockReturnValue(createUserDto);
      mockUserRepository.save.mockRejectedValue(new Error('Failed to save user'));

      await expect(userService.registerUser(createUserDto)).rejects.toThrow('Failed to save user');
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const userItems: User[] = [
        {
          id: '1',
          name: 'John Doe',
          phone: '+1 555-555-5555',
          email: 'user@example.com',
          password: 'strongPassword123',
          address: {
            street: '123 Main St',
            number: '456', // Corrigido para usar 'number' conforme CreateAddressDto
            city: 'Anytown',
            neighborhood: 'Downtown',
            postalCode: '12345', // Corrigido para usar 'postalCode' conforme CreateAddressDto
            state: 'CA',
          },
          type: UserType.NORMAL,
        },
        {
          id: '2',
          name: 'Jane Doe',
          phone: '+1 555-555-5556',
          email: 'jane@example.com',
          password: 'strongPassword456',
          address: {
            street: '456 Main St',
            number: '789', // Corrigido para usar 'number' conforme CreateAddressDto
            city: 'Othertown',
            neighborhood: 'Uptown',
            postalCode: '54321', // Corrigido para usar 'postalCode' conforme CreateAddressDto
            state: 'CA',
          },
          type: UserType.BUSINESS,
        },
      ];

      mockUserRepository.find.mockResolvedValue(userItems);

      const result = await userService.getUsers();

      expect(result).toEqual(userItems);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userItem: User = {
        id: '1',
        name: 'John Doe',
        phone: '+1 555-555-5555',
        email: 'user@example.com',
        password: 'strongPassword123',
        address: {
          street: '123 Main St',
          number: '456', // Corrigido para usar 'number' conforme CreateAddressDto
          city: 'Anytown',
          neighborhood: 'Downtown',
          postalCode: '12345', // Corrigido para usar 'postalCode' conforme CreateAddressDto
          state: 'CA',
        },
        type: UserType.NORMAL,
      };

      mockUserRepository.findOne.mockResolvedValue(userItem);

      const result = await userService.getUserById('1');

      expect(result).toEqual(userItem);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(userService.getUserById('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });
});
