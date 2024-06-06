import { MediaFolder } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const MediaFolderValidation = z.object({
  name: z.string(),
  parentId: z.number().optional().nullable(),
  parentName: z.string().optional().nullable(),
}) satisfies ZodOutputFor<MediaFolder>;
