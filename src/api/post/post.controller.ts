import { Controller } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { RestController } from '../../core/api/controller';
import { PostService } from './post.service';

@Controller('post')
export class PostController extends RestController<
  Post,
  Prisma.PostFindManyArgs,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput
> {
  constructor(readonly postService: PostService) {
    super(postService);
  }
}
