import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  parent_id: string;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column()
  owner_user_id: string;

  @Column()
  owner_user_dp_name: string;

  @Column()
  view_count: number;

  @Column()
  comment_count: number;

  @Column()
  like_count: number;

  @Column()
  dislike_count: number;

  @Column()
  visible: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  deleted_at: Date;
}
