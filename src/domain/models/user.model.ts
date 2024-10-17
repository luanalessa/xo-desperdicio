import { UserType } from "../enums/user.type";
import { Address } from "./valueObjects/adress";

export class User {
    constructor(
      public id: string,
      public name: string,
      public phone: string,
      public email: string,
      public password: string,
      public address: Address,
      public type: UserType,
    ) {}
  }
  