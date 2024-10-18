import { Module } from '@nestjs/common';
import { UsersModule } from './infrastructure/modules/user.module';
import { DonationOrderModule } from './infrastructure/modules/donation.order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/models/user.model';
import { DonationOrder } from './domain/models/donation.order.model';
import { Food } from './domain/models/food.model';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5434,
      username: 'yourUsername',
      password: 'yourPassword',
      database: 'yourDatabaseName',
      entities: [User, DonationOrder, Food], 
      synchronize: true,
      migrations: ['src/infrastructure/persistence/migration/**/*.{ts,js}'], 
    }),
    TypeOrmModule.forFeature([User, DonationOrder]),
  UsersModule, DonationOrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
