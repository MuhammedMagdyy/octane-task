import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from 'src/users/enums/user-type.enum';
import { JwtPayload } from '../common/interfaces/jwt.interface';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { ReadingIntervalsService } from './reading-intervals.service';

@Roles(UserType.USER)
@UseGuards(JwtAuthGuard)
@ApiTags('Reading Intervals')
@ApiSecurity('bearer')
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
    return this.readingIntervalsService.create(dto, payload.uuid);
  }
}
