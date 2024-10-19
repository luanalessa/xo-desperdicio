import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { FoodStatus } from '../enums/food.status';
import { FoodType } from '../enums/food.type';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: string;

  @Column( {type: 'enum',
    enum: FoodType})
  foodType: FoodType;

  @Column({ type: 'date' })
  expirationDate: Date;

  @Column('float')
  weight: number;

  @Column('int')
  quantity: number;

  @Column()
  donorId: string;

  @Column({
    type: 'enum',
    enum: FoodStatus,
  })
  status: FoodStatus;

  constructor(
    id: string,
    foodType: FoodType,
    expirationDate: Date,
    weight: number,
    quantity: number,
    donorId: string,
    status: FoodStatus
  ) {
    this.id = id;
    this.foodType = foodType;
    this.expirationDate = expirationDate;
    this.weight = weight;
    this.quantity = quantity;
    this.donorId = donorId;
    this.status = status;
  }
}
