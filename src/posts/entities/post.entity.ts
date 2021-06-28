import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  parent_id?: string | null;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column()
  owner_user_id: string;

  @Column()
  owner_user_dp_name: string;

  @Column({
    default: 0,
  })
  view_count: number;

  @Column({
    default: 0,
  })
  comment_count: number;

  @Column({
    default: 0,
  })
  like_count: number;

  @Column({
    default: 0,
  })
  dislike_count: number;

  @Column({
    default: true,
  })
  visible: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
