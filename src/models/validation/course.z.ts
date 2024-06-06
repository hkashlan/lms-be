import { Course } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const CourseValidation = z.object({
  name: z.string(),
  pathId: z.number(),
  pathName: z.string(),
  bookId: z.number().optional().nullable(),
  bookName: z.string().optional().nullable(),
}) satisfies ZodOutputFor<Course>;
