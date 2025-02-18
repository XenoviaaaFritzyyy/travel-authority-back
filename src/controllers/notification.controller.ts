import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NotificationService } from '@services/notification.service';
import { Notification } from '@entities/notification.entity';
import { NotFoundException } from '@nestjs/common';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Notification> {
    const notification = await this.notificationService.findOne(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  @Post()
  create(@Body() notification: Partial<Notification>): Promise<Notification> {
    return this.notificationService.create(notification);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.notificationService.delete(id);
  }
}
