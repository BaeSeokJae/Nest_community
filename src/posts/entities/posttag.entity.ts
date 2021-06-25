import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

@Entity('postTags')
export class PostTag {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  post_id: Post;

  @ManyToOne(() => Tag, (tag) => tag.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  tag_id: Tag;
}
