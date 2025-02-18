import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TravelRequest } from './travel-request.entity';
import { Notification } from './notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string; // Example: 'Teacher', 'Supervisor', 'Head'

  @OneToMany(() => TravelRequest, (travelRequest) => travelRequest.teacher)
  teacherRequests: TravelRequest[];

  @OneToMany(() => TravelRequest, (travelRequest) => travelRequest.supervisor)
  supervisorRequests: TravelRequest[];

  @OneToMany(() => TravelRequest, (travelRequest) => travelRequest.head)
  headRequests: TravelRequest[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
