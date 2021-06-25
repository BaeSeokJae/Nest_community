import { EntityRepository, Repository } from 'typeorm';
import { PostTag } from '../entities/posttag.entity';

@EntityRepository(PostTag)
export class PostTagRepository extends Repository<PostTag> {}
