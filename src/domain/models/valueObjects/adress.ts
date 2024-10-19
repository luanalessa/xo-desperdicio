import { Column } from 'typeorm';

export class Address {
    @Column()  
    street: string;

    @Column()
    number: string;

    @Column()
    city: string;

    @Column()
    neighborhood: string;

    @Column()
    postalCode: string;

    @Column()
    state: string;

    constructor(
        street: string,
        number: string,
        city: string,
        neighborhood: string,
        postalCode: string,
        state: string
    ) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.neighborhood = neighborhood;
        this.postalCode = postalCode;
        this.state = state;
    }
}
