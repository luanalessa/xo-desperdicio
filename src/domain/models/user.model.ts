import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserType } from '../enums/user.type';
import { Address } from './valueObjects/adress';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
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

    constructor(
        name: string,
        phone: string,
        email: string,
        password: string,
        address: Address,
        type: UserType = UserType.NORMAL, // Valor padrão para o tipo de usuário
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.address = address;
        this.type = type;
    }
}
