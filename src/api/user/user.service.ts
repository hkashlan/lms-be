import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from '../../core/database/database.service';
import { Result } from '../../core/models/result';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.db.user.create({ data: createUserDto });
  }

  async findAll(
    filter?: Prisma.UserFindManyArgs,
    page?: number,
    size?: number,
  ): Promise<Result<User>> {
    const skip = page && size ? (page - 1) * size : 0;
    const users = await this.db.user.findMany({
      ...filter,
      skip,
      take: size ?? 10,
    });
    const userCount = await this.db.user.count({ where: filter?.where });
    return {
      items: users,
      pages: userCount,
    };
  }

  async findOne(id: number): Promise<User> {
    return this.db.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.db.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User> {
    return this.db.user.delete({
      where: {
        id: id,
      },
    });
  }
}
