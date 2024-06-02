import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { APIService } from '../../core/api/service';
import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class UserService extends APIService<
  User,
  Prisma.UserFindManyArgs,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(private db: DatabaseService) {
    super({
      findMany: db.user.findMany,
      findOne: db.user.findUnique,
      count: db.user.count,
      create: db.user.create,
      update: db.user.update,
      delete: db.user.delete,
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const createdUser = await super.create(createUserDto);
    await this.checkRoles(createdUser);
    return createdUser;
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<User> {
    const updatedUser = await super.update(id, updateUserDto);
    await this.checkRoles(updatedUser);
    return updatedUser;
  }

  async checkRoles(user: User) {
    if (user.roles.includes(Role.STUDENT)) {
      const create: Prisma.StudentUncheckedCreateInput = {
        id: user.id,
        name: user.name,
        createdDate: new Date(),
        updatedDate: new Date(),
        student_info: {},
        pathInformation: [],
        createdUserId: user.createdUserId,
        createdUserName: user.createdUserName,
        updatedUserId: user.updatedUserId,
        updatedUserName: user.updatedUserName,
      };
      const tt = await this.db.student.upsert({
        where: {
          id: user.id,
        },
        create: create,
        update: {},
      });
      console.log(JSON.stringify(tt, null, 2));
    } else {
      this.db.student.delete({
        where: {
          id: user.id,
        },
      });
    }

    if (user.roles.includes(Role.TEACHER)) {
      const create: Prisma.TeacherUncheckedCreateInput = {
        id: user.id,
        name: user.name,
        createdDate: new Date(),
        updatedDate: new Date(),
        createdUserId: user.createdUserId,
        createdUserName: user.createdUserName,
        updatedUserId: user.updatedUserId,
        updatedUserName: user.updatedUserName,
      };
      this.db.teacher.upsert({
        where: {
          id: user.id,
        },
        create: create,
        update: {},
      });
    } else {
      this.db.teacher.delete({
        where: {
          id: user.id,
        },
      });
    }
  }
}
