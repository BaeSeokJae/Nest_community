import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  tag_type: string;

  @Column()
  name: string;
}
