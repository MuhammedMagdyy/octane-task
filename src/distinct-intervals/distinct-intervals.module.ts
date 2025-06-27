import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistinctIntervalsService } from './distinct-intervals.service';
import { DistinctInterval } from './entities/distinct-intervals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistinctInterval])],
  providers: [DistinctIntervalsService],
  exports: [DistinctIntervalsService],
})
export class DistinctIntervalsModule {}
