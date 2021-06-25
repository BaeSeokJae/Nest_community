import { Post } from './post.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('dislike_table')
export class DisLike {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  post_id: Post;

  @Column()
  user_id: string;
}
