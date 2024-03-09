interface filterById {
  where: { id: number };
}

interface filterByWhere {
  where?: any;
}

export interface SelectFilter extends filterByWhere {
  select?: any;
}

export interface Repository<
  T,
  Select extends SelectFilter,
  CreateInput,
  UpdateInput,
> {
  findMany: (x: Select) => Promise<T[]>;
  findOne: (x: filterById) => Promise<T>;
  count: (x: filterByWhere) => Promise<number>;
  create: (y: { data: CreateInput }) => Promise<T>;
  update: (x: filterById & { data: UpdateInput }) => Promise<T>;
  delete: (x: filterById) => Promise<T>;
}
