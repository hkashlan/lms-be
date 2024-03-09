import { Result } from '../models/result';
import { Repository, SelectFilter } from './repository';

export class APIService<
  T,
  Select extends SelectFilter,
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
    size = size ?? 10;
    const skip = page && size ? (page - 1) * size : 0;
    const users = await this.db.findMany({
      ...filter,
      skip,
      take: size,
    });
    const userCount = await this.db.count({ where: filter?.where });
    return {
      items: users,
      pages: Math.ceil(userCount / size),
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
