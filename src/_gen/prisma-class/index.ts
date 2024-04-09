import { User as _User } from './user';
import { Post as _Post } from './post';

export namespace PrismaModel {
  export class User extends _User {}
  export class Post extends _Post {}

  export const extraModels = [User, Post];
}
