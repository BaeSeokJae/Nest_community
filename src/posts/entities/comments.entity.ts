import { Post } from './post.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  post_id: Post;

  @Column()
  user_id: string;

  @Column()
  visible: boolean;

  @Column('text')
  body: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}
