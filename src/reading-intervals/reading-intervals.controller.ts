import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from 'src/users/enums/user-type.enum';
import { CreateIntervalDto } from '../common/dto/create-interval.dto';
import { JwtPayload } from '../common/interfaces/jwt.interface';
import { ReadingIntervalsService } from './reading-intervals.service';

@Roles(UserType.USER)
@UseGuards(JwtAuthGuard)
@ApiTags('Reading Intervals')
@ApiBearerAuth('access-token')
@Controller('reading-intervals')
export class ReadingIntervalsController {
  constructor(
    private readonly readingIntervalsService: ReadingIntervalsService,
  ) {}

  @Post()
  async create(
    @CurrentUser() payload: JwtPayload,
    @Body() dto: CreateIntervalDto,
  ) {
    return this.readingIntervalsService.create(dto, payload.id);
  }
}
