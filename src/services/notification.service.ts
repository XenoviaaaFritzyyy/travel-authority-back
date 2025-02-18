import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '@entities/notification.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ relations: ['user_id'] });
  }

  async findOne(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { notification_id: notificationId },
      relations: ['user'], // Use the relation name, not the column name
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found`);
    }
    return notification;
  }

  async create(notification: Partial<Notification>): Promise<Notification> {
    const newNotification = this.notificationRepository.create(notification);
    return this.notificationRepository.save(newNotification);
  }

  async delete(notificationId: number): Promise<void> {
    await this.notificationRepository.delete(notificationId);
  }
}
