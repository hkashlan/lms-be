import { z } from 'zod';

export type PropType<T> = Omit<
  T,
  | 'id'
  | 'createdDate'
  | 'createdUserName'
  | 'createdUserId'
  | 'updatedDate'
  | 'updatedUserName'
  | 'updatedUserId'
  | 'lessons'
  | 'quiz'
  | 'answerOptions'
  | 'questions'
  | 'student_info'
  | 'pathInformation'
>;
type IsSimpleType<T> = T extends string | number | boolean | symbol | Enum
  ? true
  : false;

interface Enum {
  // Marker interface for enums
}

type IsObject<T> = T extends object
  ? T extends null | undefined
    ? never
    : true
  : never;

type SimpleType<T> = {
  [P in keyof T as IsSimpleType<T[P]> extends true ? P : never]: T[P];
};

export type ZodOutputFor<T> = z.ZodType<SimpleType<PropType<T>>>;

export type DefaultValue<T extends number | boolean | string | Date> = T;

export type WithPropType<T, X> = WithType<PropType<T>, X>;

type WithType<T, X> = {
  [P in keyof T]: X;
};

type GetTypeName<T, Name extends string = never> = T extends string
  ? 'string'
  : T extends number
    ? 'number'
    : T extends Date
      ? 'Date'
      : T extends boolean
        ? 'boolean'
        : T extends symbol
          ? 'symbol'
          : T extends object & { constructor: new (...args: any[]) => any }
            ? T['constructor']['name']
            : Name;

export type PropPrismaInformation<T = any, Name extends string = string> = {
  type: Name;
  name: string;
  defaultValue?: T;
  array?: boolean;
  optional?: boolean;
  ref?: string;
};

declare function $localize(key: string): string;

export type MinMx<T> = T extends string | number | boolean | symbol | Enum
  ? number
  : () => T | T;

export type PropExtraInformation<T> = {
  hideInTable?: boolean;
  hideInForm?: boolean;
  min?: MinMx<T>;
  max?: MinMx<T>;
};

export type PropInformation<T = unknown, Name extends string = never> = {
  basic: PropPrismaInformation<T, Name>;
  extra?: PropExtraInformation<T>;
};
