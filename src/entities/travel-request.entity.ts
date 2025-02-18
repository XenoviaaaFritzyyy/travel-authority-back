import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class TravelRequest {
  @PrimaryGeneratedColumn()
  request_id: number;

  @ManyToOne(() => User, (user) => user.teacherRequests)
  teacher: User;

  @ManyToOne(() => User, (user) => user.supervisorRequests)
  supervisor: User;

  @ManyToOne(() => User, (user) => user.headRequests)
  head: User;

  @CreateDateColumn()
  request_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  submitted_at: Date;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'enum', enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' })
  status: string;
}
