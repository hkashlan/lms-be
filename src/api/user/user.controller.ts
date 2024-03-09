import { Controller } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends RestController<
  User,
  Prisma.UserFindManyArgs,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(readonly userService: UserService) {
    super(userService);
  }
}
