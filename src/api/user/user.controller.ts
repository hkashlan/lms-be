import { Controller } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ModelRestController } from '../../core/api/model.controller';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends ModelRestController<
  User,
  Prisma.UserFindManyArgs,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(userService: UserService) {
    super(userService);
  }
}
