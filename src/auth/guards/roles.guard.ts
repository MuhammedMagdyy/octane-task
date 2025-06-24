import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IRequest } from 'src/common/interfaces/request.interface';
import { ROLES_KEY } from 'src/common/utils/constants';
import { UserType } from 'src/users/enums/user-type.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles: UserType[] = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) {
      return false;
    }

    const request = context.switchToHttp().getRequest<IRequest>();
    const { uuid } = request.user;
    const user = await this.userService.findOneByUUID(uuid);

    if (!user || !roles.includes(user.userType)) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }

    return true;
  }
}
