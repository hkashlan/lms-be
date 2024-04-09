import { Post } from './post';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiProperty({ isArray: true, type: () => Post })
  posts: Post[];
}
