import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { TravelRequest } from '@entities/travel-request.entity';
import { Notification } from '@entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'teacher_management',
      entities: [User, TravelRequest, Notification],
      synchronize: true, // For dev purposes only. Disable in production.
    }),
    TypeOrmModule.forFeature([User, TravelRequest, Notification]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
