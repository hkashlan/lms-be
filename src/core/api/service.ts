import { Result } from '../models/result';
import { Repository, SelectFilter } from './repository';

export class APIService<
  T,
  Select extends SelectFilter,
  CreateInput,
  UpdateInput,
> {
  constructor(
    protected repository: Repository<T, Select, CreateInput, UpdateInput>,
  ) {}

  async create(createUserDto: CreateInput): Promise<T> {
    return this.repository.create({ data: createUserDto });
  }

  async findAll(
    filter?: Select,
    page?: number,
    size?: number,
  ): Promise<Result<T>> {
    size = size ?? 10;
    const skip = page && size ? (page - 1) * size : 0;
    const users = await this.repository.findMany({
      ...filter,
      skip,
      take: size,
    });
    const userCount = await this.repository.count({ where: filter?.where });
    return {
      items: users,
      pages: Math.ceil(userCount / size),
    };
  }

  async findOne(id: number): Promise<T> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateInput) {
    return this.repository.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<T> {
    return this.repository.delete({
      where: {
        id: id,
      },
    });
  }
}
