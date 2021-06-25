import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './repository/post.repository';
import { CommentRepository } from './repository/comment.repository';
import { DisLikeRepository } from './repository/dislike.entity';
import { LikeRepository } from './repository/like.entity';
import { PostTagRepository } from './repository/posttag.repository';
import { TagRepository } from './repository/tag.entity';
import { ViewRepository } from './repository/view.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    TypeOrmModule.forFeature([CommentRepository]),
    TypeOrmModule.forFeature([DisLikeRepository]),
    TypeOrmModule.forFeature([LikeRepository]),
    TypeOrmModule.forFeature([PostTagRepository]),
    TypeOrmModule.forFeature([TagRepository]),
    TypeOrmModule.forFeature([ViewRepository]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
