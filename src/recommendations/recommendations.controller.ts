import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from 'src/users/enums/user-type.enum';
import { RecommendationsService } from './recommendations.service';

@Roles(UserType.USER)
@UseGuards(JwtAuthGuard)
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('top-books')
  async getTopBooks() {
    return this.recommendationsService.getTopReadBooks();
  }
}
