import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserType } from '../enums/user.type';
import { Address } from './valueObjects/adress';

@Entity()  
export class User {
    @PrimaryGeneratedColumn('uuid')  
    id: string;

    @Column()  
    name: string;

    @Column()
    phone: string;

    @Column({ unique: true })  
    email: string;

    @Column()
    password: string;

    @Column(() => Address)  
    address: Address;

    @Column({
        type: 'enum',
        enum: UserType,
    })
    type: UserType;
}
