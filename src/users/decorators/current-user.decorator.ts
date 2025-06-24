import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/jwt.interface';
import { CURRENT_USER_KEY } from 'src/common/utils/constants';

export const CurrentUser = createParamDecorator(
  (_data, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const payload: JwtPayload = request[CURRENT_USER_KEY];
    return payload;
  },
);
