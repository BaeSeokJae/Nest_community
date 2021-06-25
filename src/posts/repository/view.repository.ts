import { EntityRepository, Repository } from 'typeorm';
import { View } from '../entities/view.entity';

@EntityRepository(View)
export class ViewRepository extends Repository<View> {}
