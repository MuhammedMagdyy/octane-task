import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIntervalDto } from 'src/common/dto/create-interval.dto';
import { Repository } from 'typeorm';
import { DistinctInterval } from './entities/distinct-intervals.entity';

@Injectable()
export class DistinctIntervalsService {
  constructor(
    @InjectRepository(DistinctInterval)
    private readonly distinctIntervalsRepository: Repository<DistinctInterval>,
  ) {}

  create(dto: CreateIntervalDto) {
    return this.distinctIntervalsRepository.create({
      startPage: dto.startPage,
      endPage: dto.endPage,
      book: { id: dto.bookId },
    });
  }
}
