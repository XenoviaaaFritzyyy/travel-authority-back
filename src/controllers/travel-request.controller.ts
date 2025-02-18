import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TravelRequestService } from '@services/travel-request.service';
import { TravelRequest } from '@entities/travel-request.entity';
import { NotFoundException } from '@nestjs/common';

@Controller('travel-requests')
export class TravelRequestController {
  constructor(private readonly travelRequestService: TravelRequestService) {}

  @Get()
  findAll(): Promise<TravelRequest[]> {
    return this.travelRequestService.findAll();
  }

  @Get(':id')
  async findOneRequest(@Param('id') id: number): Promise<TravelRequest> {
    const travelRequest = await this.travelRequestService.findOne(id);
    if (!travelRequest) {
      throw new NotFoundException(`TravelRequest with ID ${id} not found`);
    }
    return travelRequest;
  }

  @Post()
  create(@Body() request: Partial<TravelRequest>): Promise<TravelRequest> {
    return this.travelRequestService.create(request);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() request: Partial<TravelRequest>): Promise<TravelRequest> {
    return this.travelRequestService.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.travelRequestService.delete(id);
  }
}
