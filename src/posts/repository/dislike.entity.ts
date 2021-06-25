import { EntityRepository, Repository } from 'typeorm';
import { DisLike } from '../entities/dislike.entity';

@EntityRepository(DisLike)
export class DisLikeRepository extends Repository<DisLike> {}
