import { Result } from '../models/result';
import { Repository } from './repository';

export class APIService<
  T,
  Select extends { where: any; select: any },
  CreateInput,
  UpdateInput,
> {
  constructor(private db: Repository<T, Select, CreateInput, UpdateInput>) {}

  async create(createUserDto: CreateInput): Promise<T> {
    return this.db.create({ data: createUserDto });
  }

  async findAll(
    filter?: Select,
    page?: number,
    size?: number,
  ): Promise<Result<T>> {
    const skip = page && size ? (page - 1) * size : 0;
    const users = await this.db.findMany({
      ...filter,
      skip,
      take: size ?? 10,
    });
    const userCount = await this.db.count({ where: filter?.where });
    return {
      items: users,
      pages: userCount,
    };
  }

  async findOne(id: number): Promise<T> {
    return this.db.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateInput) {
    return this.db.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<T> {
    return this.db.delete({
      where: {
        id: id,
      },
    });
  }
}
