export type PropType<T> = Omit<
  T,
  | 'id'
  | 'createdDate'
  | 'createdUserName'
  | 'createdUserId'
  | 'updatedDate'
  | 'updatedUserName'
  | 'updatedUserId'
>;

export type ZodOutputFor<T> = z.ZodType<PropType<T>, z.ZodTypeDef, unknown>;
