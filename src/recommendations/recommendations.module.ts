import { Module } from '@nestjs/common';
import { ReadingIntervalsModule } from 'src/reading-intervals/reading-intervals.module';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

@Module({
  imports: [ReadingIntervalsModule],
  providers: [RecommendationsService],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
