import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from 'src/application/services/user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.model';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UsersModule {}
