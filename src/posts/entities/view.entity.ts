import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('views')
export class View {
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
