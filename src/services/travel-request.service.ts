import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TravelRequest } from '@entities/travel-request.entity';

@Injectable()
export class TravelRequestService {
  constructor(
    @InjectRepository(TravelRequest)
    private readonly travelRequestRepository: Repository<TravelRequest>,
  ) {}

  async findAll(): Promise<TravelRequest[]> {
    return this.travelRequestRepository.find({ relations: ['teacher_id', 'supervisor_id', 'head_id'] });
  }

  async findOne(requestId: number): Promise<TravelRequest> {
    const travelRequest = await this.travelRequestRepository.findOne({
      where: { request_id: requestId },
      relations: ['teacher_id', 'supervisor_id', 'head_id'], // Ensure these relations are correct
    });
    if (!travelRequest) {
      throw new NotFoundException(`TravelRequest with ID ${requestId} not found`);
    }
    return travelRequest;
  }

  async create(request: Partial<TravelRequest>): Promise<TravelRequest> {
    const newRequest = this.travelRequestRepository.create(request);
    return this.travelRequestRepository.save(newRequest);
  }

  async update(requestId: number, request: Partial<TravelRequest>): Promise<TravelRequest> {
    await this.travelRequestRepository.update(requestId, request);
    const updatedRequest = await this.findOne(requestId);
    if (!updatedRequest) {
      throw new NotFoundException(`TravelRequest with ID ${requestId} not found`);
    }
    return updatedRequest;
  }  

  async delete(requestId: number): Promise<void> {
    await this.travelRequestRepository.delete(requestId);
  }
}
