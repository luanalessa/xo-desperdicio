import { User } from '../models/user.model';

export interface UserRepository {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
}
