import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column({ type: 'text' })
  message: string;
}
