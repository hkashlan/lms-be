import { Controller } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends RestController<
  User,
  Prisma.UserFindManyArgs,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(userService: UserService) {
    super(userService);
  }
}
