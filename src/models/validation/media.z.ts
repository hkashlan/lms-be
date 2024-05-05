import { Media, MediaType } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const MediaValidation = z.object({
  name: z.string(),
  url: z.string(),
  ext: z.string(),
  mimetype: z.string(),
  type: z.nativeEnum(MediaType),
  size: z.number(),
  folderId: z.number(),
  folderName: z.string(),
}) satisfies ZodOutputFor<Media>;
