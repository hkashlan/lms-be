import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Post {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String })
  content?: string;

  @ApiProperty({ type: Boolean })
  published: boolean;

  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ type: Number })
  authorId: number;
}
