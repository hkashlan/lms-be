import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.db.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.db.user.findMany({
      where: {
        id: 1,
      },
    });
  }

  async findOne(id: number) {
    return this.db.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.db.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.db.user.delete({
      where: {
        id: id,
      },
    });
  }
}
