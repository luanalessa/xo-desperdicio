import { Module } from '@nestjs/common';
import { UsersModule } from './infrastructure/modules/user.module';
import { DonationsModule } from './infrastructure/modules/donation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/models/user.model';
import { Donation } from './domain/models/donation.model';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'food-donation',
      entities: [User, Donation], 
      synchronize: true,
      migrations: ['src/migrations/**/*.{ts,js}'], 
    }),
    TypeOrmModule.forFeature([User]),
  UsersModule, DonationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
